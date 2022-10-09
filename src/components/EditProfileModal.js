// Import React and Antd elements
import { React, useState } from 'react'
import { Input, Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../helpers/fetcher'
import LoadingComponent from './LoadingComponent'

function CreateModal(props) {
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const parent = props

    const handleSubmit = async (formData) => {
        await fetcher('api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: formData.fname,
                lname: formData.lname,
                location: formData.location,
                description: formData.description,
                // avatar: formData.avatar
            }),
        })
        .then( () => {
            setVisible(false)
            parent.hideModal()
        })
        .catch(() => { 
            setVisible(false)
            parent.hideModal()
        })
    }
    
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
        parent.hideModal()
    }

    return (
        <Modal className="dit-profile-modal" title="Edit Profile" open={visible} onOk={form.submit} onCancel={handleCancel}>
            {parent.userDetails ?
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >  
                    <Form.Item label="First Name" name="fname">
                        <Input defaultValue={parent.userDetails.fname || ''} style={{ width: 200 }}/>
                    </Form.Item>
                    <Form.Item label="Last Name" name="lname">
                        <Input defaultValue={parent.userDetails.lname || ''} style={{ width: 200 }}/>
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                        <Input defaultValue={parent.userDetails.location || ''} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea defaultValue={parent.userDetails.description || ''} autoSize={{ minRows: 4, maxRows: 6 }}/>
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
                :
                <LoadingComponent message="Loading..."/>
            }
        </Modal>
    )
}

export default CreateModal