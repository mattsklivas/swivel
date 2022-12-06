// Import React and Antd elements
import { React, useState } from 'react'
import { useRouter } from 'next/router'
import { Input, Select, Upload, Modal, Form } from 'antd'
import fetcher from '../../helpers/fetcher'
import { CATEGORIES } from '../../helpers/categories'

function CreateModal(props) {
    const router = useRouter()
    const [form] = Form.useForm()
    const [visible, setVisible] = useState(true)
    const [file, setfile] = useState({fileList: []})
    
    const user = props.user
    const token = props.token

    const handleUpload = ({ fileList }) => {setfile({ fileList: fileList })}

    const handleSubmit = async (formData) => {
        const formSubmit = new FormData()
        formSubmit.append('creator', user.nickname)
        formSubmit.append('title', formData.title)
        formSubmit.append('category', formData.category)
        formSubmit.append('description', formData.description)
        if(file?.fileList[0]?.originFileObj) {
            formSubmit.append('image', file.fileList[0].originFileObj)        
        }
        await fetcher(token, 'api/listing/create', {
            method: 'POST',
            body: formSubmit
        })
        .then( (res) => {
            setVisible(false)
            props.hideCreateModal()
            router.push(`/listing/${res.id}`)
        })
        .catch(() => { 
            setVisible(false)
            props.hideCreateModal()
        })
    }
    
    const handleCancel = () => {
        setVisible(false)
        form.resetFields()
        props.hideCreateModal()
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
                    <Upload fileList={file.fileList} onChange={handleUpload} beforeUpload={() => {return false}} listType="picture-card" >
                        {file.fileList.length < 1 && '+ Upload'}
                    </Upload>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateModal