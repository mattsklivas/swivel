// Import React and Antd elements
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Upload, Modal, Form, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../../helpers/fetcher'
import { CATEGORIES } from '../../helpers/categories'

function EditListingModal(props) {
    const router = useRouter()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const listing = props.listing

    // Loading state variables
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData) => {
        setIsLoading(true)
        await fetcher(props.token, `api/listing/${listing._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.title ? formData.title : listing.title ? listing.title : '',
                category: formData.category ? formData.category : listing.category ? listing.category : '',
                description: formData.description ? formData.description : listing.description ? listing.description : '',
                // avatar: formData.avatar
            }),
        })
        .then( () => {
            router.reload(window.location.pathname)
        })
        .catch(() => { 
            setVisible(false)
            props.hideModal()
        })
    }
    
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
        props.hideModal()
    }

    return (
        <Modal className="edit-profile-modal" title="Edit Profile" open={visible} onOk={form.submit} onCancel={handleCancel} confirmLoading={isLoading}>
            <Form
                initialValues={{ title: listing.title, category: listing.category, description: listing.description || '' }}
                form={form}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item label="Title" name="title" key="title" rules={[
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
                    <Input/>
                </Form.Item>
                <Form.Item label="Category" name="category" key="category" rules={[{ required: true, message: 'A category is required'}]}>
                    <Select>
                        {Object.keys(CATEGORIES).map(category => {
                            return (<Select.Option value={category}>{CATEGORIES[category]}</Select.Option>)
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="Description" name="description" key="description" rules={[{ required: true, message: 'A description is required'}]}>
                    <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }}/>
                </Form.Item>
                <Form.Item label="Upload" value="image" key="image">
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

export default EditListingModal 