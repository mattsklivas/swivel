/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable quotes */
import { React } from 'react'
import { useRouter } from 'next/router'
import { Space, Button } from 'antd'
import { EyeInvisibleOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import '../hooks/useUserDetails'
import fetcher from '../helpers/fetcher'
import { CATEGORIES } from '../helpers/categories'

export default function ListingComponent(props) {
    const router = useRouter()
    const token = props.token
    const listing = props.listing
    const showCategory = props.showCategory
    const user = props.user
    let saved = props.saved
    let canOffer = props.canOffer

    console.log(token)
    
    // Prevent ability to make an offer on user's own posts
    if (listing.creator === user.nickname) {
        canOffer = false
    }

    // Add listing to user's saved listings
    const saveListing = async () => {
        await fetcher(token, props.token, `api/user/save_listing`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.nickname,
                listing_id: listing._id
            }),
        })
        .then( () => {
            saved.push(listing._id)
        })
    }

    return (
        <div style={{backgroundColor: 'white', borderRadius: '15px', border: '1px solid #DEDEDE', padding: '5vh', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
            <Space size={25} align="start">
                <div style={{height: 200, width: 200, borderRadius: 5, border: '2px solid grey', padding: 5, backgroundColor: '#FFFFFF'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '37%'}}>
                        <EyeInvisibleOutlined style={{fontSize: 20}}/>
                    </div>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Image Not Available</span>
                </div>
                <Space direction="horizontal" align="start">
                    <Space direction="vertical" align="start">
                        <span style={{fontSize: '17px', fontWeight: 600, cursor: 'pointer'}} onClick={() => router.push(`/listing/${listing._id}`)}>{listing.title}</span>
                        <div style={{fontSize: '14px'}}>
                            <Space direction="horizontal" align="start">
                                <FileTextOutlined style={{fontSize: 20}}/>
                                <span>{listing.description.length > 340 ? `${listing.description.substring(0, 340)}...` : listing.description}</span>
                            </Space>
                        </div>
                        <div style={{fontSize: '14px', cursor: 'pointer'}} onClick={() => {router.push(`/profile/${listing.creator}`)}}>
                            <UserOutlined style={{fontSize: 20}}/>
                            <span style={{paddingLeft: 5}}>{`${listing.creator}`}</span>
                        </div>
                        <div style={{fontSize: '14px'}}>
                            <CalendarOutlined style={{fontSize: 20}}/>
                            <span style={{paddingLeft: 5}}>{`${listing.date_created.split('T')[0]}`}</span>
                        </div>
                        {showCategory && 
                            <div style={{fontSize: '14px'}}>
                                <AppstoreOutlined style={{fontSize: 20}}/>
                                <span style={{paddingLeft: 5}}>{CATEGORIES[listing.category]}</span>
                            </div>
                        }
                        <Space direction="horizontal" size={0} style={{paddingTop: 5}}>
                            <Button style={{margin: '0 5px 0 0'}} onClick={() => {router.push(`/listing/${listing._id}`)}}>View Listing</Button>
                            {user.nickname !== listing.creator && <Button style={{margin: '0 5px 0 5px'}} disabled={saved.includes(listing._id)} onClick={saveListing}>Save Listing</Button>}
                            {/* TODO: Make this into a select dropdown, show user's listings */}
                            {canOffer && <Button style={{margin: '0 0 0 5px'}} type="primary">Make Offer</Button>}
                        </Space>
                    </Space>
                </Space>
            </Space>
        </div>
    )
}

