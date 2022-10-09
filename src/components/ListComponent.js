/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-array-index-key */
// Import React
import { React } from 'react'
import { Row } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
// import LoadingComponent from './LoadingComponent'
import ListingComponent from './ListingComponent'
import '../hooks/useUser'

export default function ListComponent(props) {
    let listings = props.listings
    const category = props.category

    if (category !== 'all') {
        listings = props.listings.filter(listing => listing.category === category)
    }

    if (listings.length > 0) {
        return (
            <div>
                {category !== 'all' ? 
                    listings.map((listing, i) => {
                        return (
                            <ListingComponent key={i} listing={listing} showCategory={false}/>
                        )
                    })
                    :
                    listings.map((listing, i) => {
                        return (<ListingComponent key={i} listing={listing} showCategory={true}/>)
                    })
                }
            </div>
        )
    } else {
        return (
            <Row type="flex" justify="center" align="middle">
                <div style={{paddingTop: '5vh'}}>
                    <InboxOutlined style={{fontSize: 30, width: '100%'}}/>
                    <div>No listings to show.</div>
                </div>
            </Row>
        )
    }
}

