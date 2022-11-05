// Import React and Antd elements
import { React, useState } from 'react'
import { Modal, Radio, Space, Divider } from 'antd'
import { CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import fetcher from '../../helpers/fetcher'
import { CATEGORIES } from '../../helpers/categories'

function OfferModal(props) {
    const [visible, setVisible] = useState(true)
    const userListings = props.userListings
    const listing = props.listing
    const [value, setValue] = useState(userListings.length !== 0 ? userListings[0]._id : null)

    // Make offer
    const handleSubmit = async () => {      
        await fetcher(props.token, 'api/listing/offer', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listing_id: listing._id,
                offer_id: value,
            }),
        })
        .then( () => {
            setVisible(false)
            props.hideOfferModal()
        })
        .catch(() => { 
            setVisible(false)
            props.hideOfferModal()
        })
        await fetcher(props.token, 'api/notif/notifUpdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listing_id: listing._id, // user that created the inital listing
                listing_user:listing.creator,
                listing_title:listing.title,
                accepted_user: '', // user that offered their listing to 'listing_user'
                accepted_title: '',
                accepted_id: value,
                type:'offer made'
            }),
        })
    }

    const handleCancel = () => {
        setVisible(false)
        props.hideOfferModal()
    }

    // Change selected value
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <Modal className="create-modal" title="Make An Offer" open={visible} onOk={handleSubmit} onCancel={handleCancel} okButtonProps={{ disabled: userListings.length === 0 }} width={500}>
            {userListings.length !== 0 ?
                <Radio.Group onChange={onChange} value={value} style={{paddingBottom: 20, height: '50vh', overflow: 'auto'}}>
                    <Space direction="vertical">
                        {userListings.map((item, i) => {
                            return (
                                <>
                                    <Radio className="offer-radio-btn" key={item._id} value={item._id}>
                                        <Space direction="vertical" align="start">
                                            <div style={{width: '55vh'}}>
                                                <span style={{fontSize: '20px', fontWeight: 600}}>{item.title}</span>
                                                <div style={{fontSize: '14px'}}>
                                                <Space direction="horizontal" align="start">
                                                    <FileTextOutlined style={{fontSize: 20}}/>
                                                    <span>{item.description.length > 340 ? `${item.description.substring(0, 340)}...` : item.description}</span>
                                                </Space>
                                                </div>
                                                <div style={{fontSize: '14px'}}>
                                                    <CalendarOutlined style={{fontSize: 20}}/>
                                                    <span style={{paddingLeft: 5}}>{`${item.date_created.split('T')[0]}`}</span>
                                                </div>
                                                <div style={{fontSize: '14px'}}>
                                                    <AppstoreOutlined style={{fontSize: 20}}/>
                                                    <span style={{paddingLeft: 5}}>{CATEGORIES[item.category]}</span>
                                                </div>
                                            </div>
                                        </Space>
                                    </Radio>
                                    {i < userListings.length - 1 && <Divider />}
                                </>
                            )
                        })}
                    </Space>
                </Radio.Group>
                :
                <div style={{paddingBottom: 20, fontWeight: 400}}>No listings available to place as an offer.</div>
            }
        </Modal>
    )
}

export default OfferModal