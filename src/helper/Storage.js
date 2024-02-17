// var CryptoJS = require('crypto-js')
import CryptoJS from 'crypto-js';

var STORAGE;

export default {
  Set(key, data) {
    key = import.meta.env.VITE_APP_NAME + key;
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    if (typeof data !== 'string') {
      data = this.convertToType(data, 'string')
    }

    try {
      localStorage.setItem(this.MD5(key), this.Encrypt(data))
    } catch (e) {
      if (STORAGE) {
        STORAGE[this.MD5(key)] = this.Encrypt(data)
      }
    }

  },

  Get(key, defaultValue, type = 'string') {
    key = import.meta.env.VITE_APP_NAME + key;
    var data;
    try {
      data = localStorage.getItem(this.MD5(key))
    } catch (e) {
      if (STORAGE) {
        data = STORAGE[this.MD5(key)]
      }
    }

    if (!data) {
      data = defaultValue
    } else {
      data = this.Decrypt(data)
    }
    if (typeof data !== typeof this.getTypeData(type)) {
      data = this.convertToType(data, type)
    }
    return data
  },

  Clear() {
    try {
      localStorage.clear()
    } catch (e) {
      STORAGE = [];
    }
  },

  Encrypt(string) {
    return CryptoJS.AES.encrypt(string, import.meta.env.VITE_APP_APP_SALT).toString()
  },

  Decrypt(string) {
    return CryptoJS.AES.decrypt(string, import.meta.env.VITE_APP_APP_SALT).toString(CryptoJS.enc.Utf8)
  },

  MD5(string) {
    return CryptoJS.MD5(string).toString()
  },

  convertToType(data, type) {
    switch (type) {
      case 'bool':
        data = data === 'true'
        break
      case 'number':
        data = Number(data)
        break
      case 'string':
        data = String(data)
        break
      case 'object':
        data = JSON.parse(String(data))
        break
    }
    return data
  },

  getTypeData(type) {
    let data
    switch (type) {
      case 'bool':
        data = false
        break
      case 'number':
        data = 0
        break
      case 'string':
        data = ''
        break
      case 'object':
        data = {}
        break
    }
    return data
  }
}
