import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a user's details
function useUser(profileID, token) {
    const { 
        data: userResponse, 
        error: userDetailsError
    } = useSWR([
        `/api/user/${profileID}`, token
    ], {
        fetcher: hookFetcher,
        shouldRetryOnError: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    let userDetails = []

    if (userResponse) {
        userDetails = userResponse.data
    }

    return {
        userDetails,
        userDetailsError,
        userDetailsLoading: (!userDetailsError && !userResponse),
    }
}

// Export the hook
export default useUser