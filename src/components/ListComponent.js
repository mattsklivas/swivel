/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
// Import React
import { React } from 'react'
import { Row } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
// import LoadingComponent from './LoadingComponent'
import ListingComponent from './ListingComponent'

export default function ListComponent(props) {
    let listings = props.listings
    const category = props.category
    const user = props.user
    const saved = props.saved
    const userListings = props.userListings
    const canOffer = props.canOffer || false
    const canAccept = props.canAccept || false
    const token = props.token
    const sourceListing = props.sourceListing || null

    if (category !== 'all' && listings && listings.length > 0) {
        listings = props.listings.filter(listing => listing.category === category)
    }

    if (listings && listings.length > 0) {
        return (
            <div>
                {category !== 'all' ? 
                    listings.reverse().map((listing, i) => {
                        return (
                            <ListingComponent 
                                key={i} 
                                listing={listing} 
                                showCategory={false} 
                                user={user} 
                                saved={saved} 
                                userListings={userListings} 
                                canOffer={canOffer} 
                                canAccept={canAccept} 
                                token={token}
                                sourceListing={sourceListing}
                            />
                        )
                    })
                    :
                    listings.reverse().map((listing, i) => {
                        return (
                            <ListingComponent 
                                key={i} 
                                listing={listing} 
                                showCategory={true} 
                                user={user} 
                                saved={saved} 
                                userListings={userListings} 
                                canOffer={canOffer} 
                                canAccept={canAccept} 
                                token={token}
                                sourceListing={sourceListing}
                            />
                        )
                    })
                }
            </div>
        )
    } else {
        return (
            <Row type="flex" justify="center" align="middle">
                <div style={{padding: '5vh 0'}}>
                    <InboxOutlined style={{fontSize: 30, width: '100%'}}/>
                    <div>No listings to show.</div>
                </div>
            </Row>
        )
    }
}

