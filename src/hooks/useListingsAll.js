import useSWR from 'swr'
import hookFetcher from '../helpers/hookFetcher'

// Fetch all listings
function useListings(token) {
    return useSWR(['/api/listing/all/', token], hookFetcher)
}

export default useListings