// Antd-specific imports
import { notification } from 'antd'

const dev = process.env.NODE_ENV !== 'production'
const API_URL = process.env.API_URL || 'http://localhost:3000'

const hookFetcher = (url, accessToken) => {
    const token = accessToken

    const configuration = {
            headers: {
            Authorization: `Bearer ${token}`
        }
    }

    url = `${API_URL}${url}`

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
