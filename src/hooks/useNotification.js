import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a specific listing
function useListing(username, token) {
    return useSWR(() => {
        if (username) {
            return [`/api/notification/byUser/${username}`, token]
        }
        return undefined
    }, hookFetcher)
}

// Export the hook
export default useListing