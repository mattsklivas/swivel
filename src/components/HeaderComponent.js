// Import React and Antd elements
import { React, useState } from 'react'
import { Col, Row, Dropdown, Menu, Space} from 'antd'
import { UserOutlined, NotificationOutlined, MessageOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import CreateModal from './CreateModal'
import logo from '../../public/icon.svg'

function HeaderComponent(props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const showCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    const ProfileDropdown = (
        <Menu
            items={[
            {
                key: '1',
                label: (
                    <Link href={props?.user?.nickname ? `/profile/${props.user.nickname}` : '/profile/test'}>
                        My Profile
                    </Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link href="/api/auth/logout">
                        Logout
                    </Link>
                ),
            }
            ]}
        />
    )

    const NotificationDropdown = (
        <Menu
            items={[
            {
                key: '1',
                label: (
                    <Link href="/">
                        Clicking this should forward to listing
                    </Link>
                ),
            },
            {
                key: '2',
                label: (
                    <Link href="/">
                        Clicking this should forward to listing
                    </Link>
                ),
            },
            {
                key: '3',
                label: (
                    <Link href="/">
                        Clicking this should forward to listing
                    </Link>
                ),
            }
            ]}
        />
    )

    return (
        <>
            <Row style={{background: '#3ad8af', marginBottom: '20px'}}>
                <Col span={8}>
                    <div style={{ width: 200, paddingTop: 7, paddingLeft: 10 }}>
                        <span style={{display: 'inline-block', fontweight: 500, color: 'white'}}>User: </span>
                        <span style={{display: 'inline-block', paddingLeft: '5px', fontweight: 500, color: 'white'}}>{props?.user?.nickname || 'N/A'}</span>
                    </div>
                </Col>
                <Col span={8}>
                    <Link href="/">
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Image style={{filter: 'invert(100%)', cursor: 'pointer'}} src={logo} height={35} width={35} />
                            <span style={{display: 'inline-block', color: 'white', paddingLeft: '6px', userSelect: 'none', fontSize: '25px', cursor: 'pointer' }}>Swivel</span>
                        </div>
                    </Link>
                </Col>
                <Col span={8}>
                    <Link href="/">
                        <div style={{display: 'flex', justifyContent: 'right', paddingRight: '15px', paddingTop: '8px'}}>
                            <Space size={15}>
                                <PlusCircleOutlined style={{ fontSize: 20, color: 'white' }} onClick={showCreateModal}/>
                                <Link href="/">
                                    <MessageOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                </Link>
                                <Dropdown overlay={NotificationDropdown} placement="bottomRight">
                                    <NotificationOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                </Dropdown>
                                <Dropdown overlay={ProfileDropdown} placement="bottomRight">
                                    <UserOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                </Dropdown>
                            </Space>
                        </div>
                    </Link>
                </Col>
            </Row>
            { isCreateModalOpen && <CreateModal hideCreateModal={() => {setIsCreateModalOpen(false)}} />}
        </>
    )
}

export default HeaderComponent