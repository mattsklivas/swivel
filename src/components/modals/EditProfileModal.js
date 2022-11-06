// Import React and Antd elements
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Upload, Modal, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import fetcher from '../../helpers/fetcher'

function EditProfileModal(props) {
    const router = useRouter()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const nickname = props.user.nickname
    const userDetails = props.userDetails
    const [file, setfile] = useState({fileList: []})

    const handleUpload = ({ fileList }) => {setfile({ fileList: fileList })};

    // Loading state variables
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData) => {
        const form = new FormData();
        form.append("fname", formData.fname ? formData.fname : userDetails.fname ? userDetails.fname : '')
        form.append("lname", formData.lname ? formData.lname : userDetails.lname ? userDetails.lname : '')
        form.append("location", formData.location ? formData.location : userDetails.location ? userDetails.location : '')
        form.append("description", formData.description ? formData.description : userDetails.description ? userDetails.description : '')
        if(file?.fileList[0]?.originFileObj)
        {
            form.append("avatar", file.fileList[0].originFileObj)
            console.log("form value for image: " + file.fileList[0].originFileObj)
        }
        setIsLoading(true)
        await fetcher(props.token, `api/user/profile/${nickname}`, {
            method: 'PATCH',
            body: form
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
                <Form.Item label="Upload" value="avatar">
                    <Upload value="avatar" fileList={file.fileList} onChange={handleUpload} beforeUpload={(file)=>{return false}} listType="picture-card">
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

export default EditProfileModal 