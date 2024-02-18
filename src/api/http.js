import API from '@/api/api'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  get(url) {
    return new Promise((resolve, reject) => {
      API.get(url).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  post(url, data, headers = {}) {
    return new Promise(async (resolve, reject) => {
      await API.post(url, data, { headers: headers }).then((response) => {
        resolve(response.data)
      }).catch(error => {
        if (error.response.data.data.message) {
          toast.error(error.response.data.data.message);
        }
        reject(error)
      })
    })
  },
  put(url, data, headers = {}) {
    return new Promise((resolve, reject) => {
      API.put(url, data, { headers: headers }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  patch(url, data, headers = {}) {
    return new Promise((resolve, reject) => {
      API.patch(url, data, { headers: headers }).then(response => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  delete(url, data) {
    return new Promise((resolve, reject) => {
      API.delete(url, data).then((response) => {
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout(data) {
    return new Promise((resolve) => {
      API.post('logout').then((response) => {
        resolve(response.data)
      }).catch(error => {
        console.warn(error);
      })
    })
  },
  // validateToken() {
  //   return new Promise((resolve) => {
  //     // TO DO reject
  //     resolve()
  //   })
  // },
}
