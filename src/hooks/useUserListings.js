import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a user's listings
function useUserListings(nickname, token) {
    return useSWR(() => {
        if (nickname) {
            return [`/api/listing/byUser/${nickname}`, token]
        }
        return undefined
    }, hookFetcher)
}

// Export the hook
export default useUserListings