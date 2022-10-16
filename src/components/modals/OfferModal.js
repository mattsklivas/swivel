// Import React and Antd elements
import { React, useState } from 'react'
import { Modal, Radio, Space } from 'antd'
import fetcher from '../../helpers/fetcher'

function OfferModal(props) {
    const [visible, setVisible] = useState(true)
    const userListings = props.userListings
    const listing = props.listing

    const [value, setValue] = useState(userListings.length !== 0 ? userListings[0]._id : null)

    // Make offer
    const handleSubmit = async () => {
        await fetcher('api/listing/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listing_id: listing._id,
                offer_id: value
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
        <Modal className="create-modal" title="Make An Offer" open={visible} onOk={handleSubmit} onCancel={handleCancel} okButtonProps={{ disabled: userListings.length === 0 }}>
            {userListings.length !== 0 ?
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        {userListings.map(item => {
                            return (<Radio value={item._id}>{item.title}</Radio>)
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