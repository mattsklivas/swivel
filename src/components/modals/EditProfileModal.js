// Import React and Antd elements
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Upload, Modal, Form } from 'antd'
import fetcher from '../../helpers/fetcher'

function EditProfileModal(props) {
    const router = useRouter()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const nickname = props.user.nickname
    const userDetails = props.userDetails
    const [file, setfile] = useState({fileList: []})

    const handleUpload = ({ fileList }) => {setfile({ fileList: fileList })}

    // Loading state variables
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData) => {
        const formSubmit = new FormData()
        formSubmit.append('fname', formData.fname ? formData.fname : userDetails.fname ? userDetails.fname : '')
        formSubmit.append('lname', formData.lname ? formData.lname : userDetails.lname ? userDetails.lname : '')
        formSubmit.append('location', formData.location ? formData.location : userDetails.location ? userDetails.location : '')
        formSubmit.append('description', formData.description ? formData.description : userDetails.description ? userDetails.description : '')
        if(file?.fileList[0]?.originFileObj) {
            formSubmit.append('avatar', file.fileList[0].originFileObj)
        }
        setIsLoading(true)
        await fetcher(props.token, `api/user/profile/${nickname}`, {
            method: 'PATCH',
            body: formSubmit
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
                    <Upload value="avatar" fileList={file.fileList} onChange={handleUpload} beforeUpload={() => {return false}} listType="picture-card">
                        {file.fileList.length < 1 && '+ Upload'}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditProfileModal 