// Antd-specific imports
import { notification } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const API_URL = process.env.API_URL || 'http://localhost:3000/'

// 
const hookFetcher = (url, query, configuration, token) => {
    if (!configuration) {
        configuration = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    } else if (configuration.headers) {
        configuration.headers.Authorization = `Bearer ${token}`
    }

    url = `${API_URL}${url}`

    if (query) {
        const queryString = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')

        url = `${url}?${queryString}`
    }

    return fetch(url, configuration)
        .then(async response => {
            if (!response.ok) {
                const json = await response.json()

                notification.error({
                    description: `(${json.error.code}): ${json.error.message}`,
                })
            }

            return response.json()
        })
}

export default hookFetcher