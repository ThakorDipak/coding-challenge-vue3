import API from '@/api/http'
import { ObjectAction } from '@/models/Base'

const { createAPIUrl } = ObjectAction

const userUrl = 'user'
const bulkUserDeleteUrl = 'user/delete'
const headers = { 'Content-Type': 'multipart/form-data' }

export default {
    get(data) {
        return new Promise(async (resolve, reject) => {
            const Url = createAPIUrl(userUrl, false, data)
            await API.get(Url).then(async (response) => {
                if (response && response.success == true) {
                    resolve(response.data)
                } else {
                    resolve(response.data)
                }
            })
        })
    },

    update(data) {
        return new Promise(async (resolve, reject) => {
            const updateUrl = createAPIUrl(userUrl, data.id)
            await API.post(updateUrl, data, headers).then(async (response) => {
                if (response && response.status == true) {
                    resolve(response.data)
                } else {
                    resolve(response.data)
                }
            })
        })
    },

    bulkUserDestroy(data) {
        return new Promise(async (resolve, reject) => {
            await API.post(bulkUserDeleteUrl, data, headers).then(async (response) => {
                if (response && response.status == true) {
                    resolve(response.data)
                } else {
                    resolve(response.data)
                }
            })
        })
    },

    destroy(data) {
        return new Promise(async (resolve, reject) => {
            const deleteUrl = createAPIUrl(userUrl, data.id)
            await API.delete(deleteUrl, data).then(async (response) => {
                if (response && response.status == true) {
                    resolve(response.data)
                } else {
                    resolve(response.data)
                }
            })
        })
    }
}
