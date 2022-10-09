import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch all listings
function useListings(listingID, token) {
    const { 
        data: listingsResponse, 
        error: listingsError
    } = useSWR([
        `/api/listing/one/${listingID}`, token], hookFetcher
    , {
        shouldRetryOnError: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })

    let listings = []

    if (listingsResponse) {
        listings = listingsResponse.data
    }

    return {
        listings,
        listingsError,
        listingsLoading: (!listingsError && !listingsResponse),
    }
}

// Export the hook
export default useListings