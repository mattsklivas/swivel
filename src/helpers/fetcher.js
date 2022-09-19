// Antd-specific imports
import { notification } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const API_URL = process.env.API_URL || 'http://localhost:3000/'

// 
const updateOptions = (options) => {
    const update = { ...options }

    // TODO: Append user auth before making a call to the backend
    // if (localStorage.api) {
    //     update.headers = {
    //         ...update.headers,
    //         Authorization: `Bearer ${localStorage.api}`,
    //     }
    // }

    return update
}

export default function (url, options) {
    url = `${API_URL}${url}`

    return new Promise((resolve, reject) => {
        fetch(url, updateOptions(options))
            .then(async response => {
                if (!response.ok) {
                    const json = await response.json()

                    notification.open({
                        type: 'error',
                        description: `(${response.status}): ${response.statusText}`,
                    })

                    return reject(json)
                }

                const json = await response.json()

                if (dev) {
                    notification.open({
                        type: 'success',
                        description: response.statusText,
                    })
                }

                return resolve(json)
            })
            .catch(error => {
                notification.open({
                    type: 'error',
                    description: error.statusText,
                })

                reject(error)
            })
    })
}