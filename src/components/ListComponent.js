/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
// Import React
import { React } from 'react'
import { Row } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
// import LoadingComponent from './LoadingComponent'
import ListingComponent from './ListingComponent'
import '../hooks/useUserDetails'

export default function ListComponent(props) {
    let listings = props.listings
    const category = props.category
    const user = props.user
    const canOffer = props.canOffer

    if (category !== 'all') {
        listings = props.listings.filter(listing => listing.category === category)
    }

    if (listings && listings.length > 0) {
        return (
            <div>
                {category !== 'all' ? 
                    listings.map((listing, i) => {
                        return (
                            <ListingComponent key={i} listing={listing} showCategory={false} user={user} canOffer={canOffer}/>
                        )
                    })
                    :
                    listings.map((listing, i) => {
                        return (<ListingComponent key={i} listing={listing} showCategory={true} user={user} canOffer={canOffer}/>)
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

