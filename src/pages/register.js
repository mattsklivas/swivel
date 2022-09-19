// Import React
import React from 'react'
import { useRouter } from 'next/router'

// Import Antd elements
import { Row, Card, Button, Form, Input, Space } from 'antd'

// Helpers
import fetcher from '../helpers/fetcher'

function Home() {
    const router = useRouter()

    // Function to handle registration
    const handleSubmit = async (credentials) => {
        await fetcher('api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: credentials.username,
                email: credentials.email,
                password: credentials.password
            }),
        })
        .then( () => {
            useRouter.push('/login')
        })
        .catch(() => { })
    }

    return (
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh'}}>

            <Card title="Register">
                <Form
                    name="basic"
                    labelCol={{ span: 10 }}
                    initialValues={{ remember: true }}
                    onFinish={ handleSubmit }
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        validateTrigger="onSubmit"
                        rules={[
                            {
                                required: true,
                                message: 'A username is required',
                            },
                            { 
                                min: 4,
                                max: 16, 
                                message: 'Username must be have minimum 4 characters and maximum 16 characters' 
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        validateTrigger="onSubmit"
                        rules={[
                            {
                                required: true,
                                message: 'An email is required',
                            },
                            {
                                type: 'email',
                                message: 'The input is not a valid email address',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        validateTrigger="onSubmit"
                        rules={[
                            {
                                required: true,
                                message: 'A password is required',
                            },
                            { 
                                min: 8,
                                message: 'Username must have minimum 8 characters' 
                            }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="password_confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback="true"
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('The two passwords entered do not match'))
                                    },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                            <Button href="/login">
                                Login
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    )
}

export default Home