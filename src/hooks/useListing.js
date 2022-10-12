import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch a specific listing
function useListing(listingID, token) {
    return useSWR([`/api/listing/${listingID}`, token], hookFetcher)
}

// Export the hook
export default useListing