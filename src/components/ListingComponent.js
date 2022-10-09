/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable quotes */
import { React } from 'react'
import { useRouter } from 'next/router'
import { Space, Button } from 'antd'
import { EyeInvisibleOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import '../hooks/useUserDetails'

// Global categories object
const CATEGORIES = {
    trades : "Trades & Construction",
    coding : "Programming & Tech",
    music : "Music & Audio",
    art : "Art & Fashion",
    marketing : "Marketing",
    other : "Other"
}

export default function ListingComponent(props) {
    const router = useRouter()
    const listing = props.listing
    const showCategory = props.showCategory

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
                        <span style={{fontSize: '17px', fontWeight: 600}}>{listing.title}</span>
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
                            <span style={{paddingLeft: 5}}>{`${listing.date_created}`}</span>
                        </div>
                        {showCategory && 
                            <div style={{fontSize: '14px'}}>
                                <AppstoreOutlined style={{fontSize: 20}}/>
                                <span style={{paddingLeft: 5}}>{CATEGORIES[listing.category]}</span>
                            </div>
                        }
                        <Space direction="horizontal" size={0} style={{paddingTop: 5}}>
                            <Button style={{margin: '0 5px 0 0'}} onClick={() => {router.push(`/listing/${listing.id}`)}}>View Listing</Button>
                            {/* TODO: Make this into a select dropdown, show user's listings */}
                            <Button style={{margin: '0 0 0 5px'}} type="primary">Make Offer</Button>
                        </Space>
                    </Space>
                </Space>
            </Space>
        </div>
    )
}

