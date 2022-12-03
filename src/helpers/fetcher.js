// Antd-specific imports
import { notification } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const API_URL = process.env.API_URL || 'http://localhost:3000/'

// Update request header to include bearer token
const updateOptions = (token, options) => {
    const update = { ...options }

    update.headers = {
        ...update.headers,
        Authorization: `Bearer ${token}`
    }

    return update
}

export default function (token, url, options) {
    url = `${API_URL}${url}`

    return new Promise((resolve, reject) => {
        fetch(url, updateOptions(token, options))
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
                    description: error,
                })

                reject(error)
            })
    })
}