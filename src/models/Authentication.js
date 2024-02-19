import API from '@/api/http';
import { toast } from "vue3-toastify";
import { useUserStore } from '@/stores/user'

const endpointRegister = 'register';

const initialState = () => ({
  user: {},
  token: {},
  errors: {},
  isLoggedIn: false,
  isFirstLoad: true
})

const state = initialState()

export default {
  authenticate(data) {
    const { storeAuthenticate, storeToken } = useUserStore()
    return new Promise(async (resolve, reject) => {
      await API.post('login', data).then(async (response) => {
        if (response && response.success == true) {
          await storeToken(response.data.token)
          await storeAuthenticate(response.data)
          toast.success(response.message);
          resolve(response)
        }
      }).catch((error) => {
        toast.error(error.response.data.message);
        reject(error.response.data)
      })
    })
  },

  create(data) {
    return new Promise(async (resolve, reject) => {
      await API.post(endpointRegister, data).then(async (response) => {
        if (response && response.success == true) {
          toast.success(response.message);
          resolve(response.data)
        } else {
          resolve(response.data)
        }
      })
    })
  },

  resendVerifyMail(data) {
    return new Promise(async (resolve, reject) => {
      await API.post('resend-verify-mail', data).then(async (response) => {
        if (response && response.success == true) {
          toast.success(response.message);
          resolve(response.data)
        } else {
          resolve(response.data)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  verification(data) {
    return new Promise(async (resolve, reject) => {
      await API.get('email-verify/' + data.token).then(async (response) => {
        if (response && response.success == true) {
          toast.success(response.message);
          resolve(response)
        } else {
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
}
