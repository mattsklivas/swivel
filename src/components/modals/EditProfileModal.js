// Import React and Antd elements
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../../helpers/fetcher'
import LoadingComponent from '../LoadingComponent'

function EditProfileModal(props) {
    const router = useRouter()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const nickname = props.user.nickname
    const userDetails = props.userDetails

    const handleSubmit = async (formData) => {
        await fetcher(props.token, `api/user/profile/${nickname}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fname: formData.fname || '',
                lname: formData.lname || '',
                location: formData.location || '',
                description: formData.description || '',
                // avatar: formData.avatar
            }),
        })
        .then( () => {
            setVisible(false)
            props.hideModal()
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
        <Modal className="edit-profile-modal" title="Edit Profile" open={visible} onOk={form.submit} onCancel={handleCancel}>
            {userDetails ?
                <Form
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 18 }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >  
                    <Form.Item label="First Name" name="fname">
                        <Input defaultValue={userDetails.fname || ''} style={{ width: 200 }}/>
                    </Form.Item>
                    <Form.Item label="Last Name" name="lname">
                        <Input defaultValue={userDetails.lname || ''} style={{ width: 200 }}/>
                    </Form.Item>
                    <Form.Item label="Location" name="location">
                        <Input defaultValue={userDetails.location || ''} />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea defaultValue={userDetails.description || ''} autoSize={{ minRows: 4, maxRows: 6 }}/>
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

export default EditProfileModal 