// Import React and Antd elements
import { React, useState } from 'react'
import { Input, Select, Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../helpers/fetcher'

function CreateModal(props) {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const parent = props

    const handleSubmit = async (formData) => {
        console.log(formData)
        await fetcher('api/listing', {
            method: 'CREATE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: formData.title,
                category: formData.category,
                description: formData.description,
                // image: formData.image
            }),
        })
        .then( () => {
            setVisible(false)
            parent.hideCreateModal()
        })
        .catch(() => { 
            setVisible(false)
            parent.hideCreateModal()
        })
    }
    
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
        parent.hideCreateModal()
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
                        <Select.Option value="trades">Trades &amp; Construction</Select.Option>
                        <Select.Option value="coding">Programming &amp; Tech</Select.Option>
                        <Select.Option value="music">Music &amp; Audio</Select.Option>
                        <Select.Option value="art">Art &amp; Fashion</Select.Option>
                        <Select.Option value="marketing">Marketing</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
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

export default CreateModal