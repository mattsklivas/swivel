import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a user's profile details + associated listings
function useUserDetails(nickname, token) {
    return useSWR(() => {
        if (nickname) {
            return [`/api/user/profile/${nickname}`, token]
        }
        return undefined
    }, hookFetcher)
}

// Export the hook
export default useUserDetails