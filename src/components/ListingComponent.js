/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable quotes */
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Space, Button } from 'antd'
import { EyeInvisibleOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import OfferModal from './modals/OfferModal'
import '../hooks/useUserDetails'
import fetcher from '../helpers/fetcher'
import { CATEGORIES } from '../helpers/categories'

export default function ListingComponent(props) {
    const router = useRouter()
    const token = props.token
    const listing = props.listing
    const showCategory = props.showCategory
    const user = props.user
    const userListings = props.userListings
    let saved = props.saved
    let canOffer = props.canOffer
    
    // Prevent ability to make an offer on user's own posts
    if (listing.creator === user.nickname) {
        canOffer = false
    }

    // Handle state of OfferModal
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Add listing to user's saved listings
    const saveListing = async () => {
        await fetcher(token, `api/user/save_listing`, {
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
            saved.concat(listing._id)
        })
    }

    // Remove listing from user's saved listings
    const unsaveListing = async () => {
        await fetcher(token, `api/user/unsave_listing`, {
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
            saved = saved.filter(item => item._id !== listing._id)
        })
    }

    return (
        <>
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
                                {user.nickname !== listing.creator ? !saved.reduce((previous, current) => {return previous.concat(current._id)}, []).includes(listing._id) ?
                                    <Button style={{margin: '0 5px 0 5px'}} onClick={saveListing}>Save Listing</Button>
                                    :
                                    <Button style={{margin: '0 5px 0 5px'}} onClick={unsaveListing}>Unsave Listing</Button>
                                    :
                                    ''
                                }
                                {canOffer && <Button style={{margin: '0 0 0 5px'}} type="primary" onClick={() => setIsModalOpen(true)}>Make Offer</Button>}
                            </Space>
                        </Space>
                    </Space>
                </Space>
            </div>
            {isModalOpen && <OfferModal hideOfferModal={() => setIsModalOpen(false)} listing={listing} userListings={userListings.filter(item => !listing.offers.includes(item._id))} token={token}/>}
        </>
    )
}

