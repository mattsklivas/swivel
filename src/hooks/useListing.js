import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a specific listing
function useListing(listingID, token) {
    return useSWR(() => {
        if (listingID) {
            return [`/api/listing/${listingID}`, token]
        }
        return undefined
    }, hookFetcher)
}

// Export the hook
export default useListing