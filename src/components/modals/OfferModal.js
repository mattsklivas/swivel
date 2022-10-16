// Import React and Antd elements
import { React, useState } from 'react'
import { Modal } from 'antd'
import fetcher from '../../helpers/fetcher'

function OfferModal(props) {
    const [visible, setVisible] = useState(true)
    const parent = props

    const handleSubmit = async (listing, offer) => {
        await fetcher('api/listing/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: listing.title,
                category: listing.category,
                description: listing.description,
                // image: listing.image
            }),
        })
        .then( () => {
            setVisible(false)
            parent.hideOfferModal()
        })
        .catch(() => { 
            setVisible(false)
            parent.hideOfferModal()
        })
    }
    
    const handleCancel = () => {
        setVisible(false)
        parent.hideOfferModal()
    }

    return (
        <Modal className="create-modal" title="Make An Offer" open={visible} onOk={handleSubmit} onCancel={handleCancel}>
            <div>Content</div>
        </Modal>
    )
}

export default OfferModal