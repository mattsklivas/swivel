// Import React and Antd elements
import { React, useState } from 'react'
import { Input, Select, Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../../helpers/fetcher'
import { CATEGORIES } from '../../helpers/categories'

function OfferModal(props) {
    const [form] = Form.useForm()
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
        form.resetFields()
        parent.hideOfferModal()
    }

    return (
        <Modal className="create-modal" title="Create Listing" open={visible} onOk={form.submit} onCancel={handleCancel}>
            <Form
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item label="Title" name="title" rules={[
                    {
                        required: true,
                        message: 'A title is required',
                    },
                    { 
                        min: 5,
                        max: 340, 
                        message: 'Title must be have minimum of 5 characters and maximum 340 characters' 
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Category" name="category" rules={[{ required: true, message: 'A category is required'}]}>
                    <Select>
                        {Object.keys(CATEGORIES).map(category => {
                            return (<Select.Option value={category}>{CATEGORIES[category]}</Select.Option>)
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[{ required: true, message: 'A description is required'}]}>
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }}/>
                </Form.Item>
                <Form.Item label="Upload" value="image">
                    <Upload listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default OfferModal