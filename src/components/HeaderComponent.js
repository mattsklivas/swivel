// Import React and Antd elements
import { React, useState, useEffect } from 'react'
import { Col, Row, Dropdown, Menu, Space, Badge} from 'antd'
import { UserOutlined, NotificationOutlined, PlusCircleOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import CreateModal from './modals/CreateModal'
import logo from '../../public/icon.svg'
import useNotification from '../hooks/useNotification'
import fetcher from '../helpers/fetcher'

function HeaderComponent(props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const user = props.user
    const token = props.token

    const showCreateModal = () => {
        setIsCreateModalOpen(true)
    }

    // Get the user's notifications
    const { data: notifications } = useNotification(props?.user?.nickname, token)

    // Flag to check if hook has completed
    const [initialized, setInitialized] = useState(false)

    // Notifications dropdown content
    const [notificationDropdown, setNotificationDropdown] = useState([])

    // Flag to prevent the marking of notifications as seen more than once
    const [isMarkedSeen, setIsMarkedSeen] = useState(false)

    const getDropdownMessage = (notif) => {
        switch(notif.type) {
            case 'offer':
                return (
                    <div>
                        <strong style={{color: '#1890ff'}}>{notif.user_from}</strong> has placed an offer for your listing: <strong style={{color: '#1890ff'}}>{`${notif.user_listing_title}`}</strong><br />
                        <strong style={{color: '#262626'}}>Offer title: </strong><strong style={{color: '#1890ff'}}>{`${notif.user_from_listing_title}`}</strong>
                    </div>
                )
            case 'rescind':
                return (
                    <div>
                        <strong style={{color: '#1890ff'}}>{notif.user_from}</strong> has rescinded an offer for your listing: <strong style={{color: '#1890ff'}}>{`${notif.user_listing_title}`}</strong><br />
                        <strong style={{color: '#262626'}}>Title of rescinded offer: </strong><strong style={{color: '#1890ff'}}>{`${notif.user_from_listing_title}`}</strong>
                    </div>
                )
            case 'accept':
                return (
                    <div>
                        <strong style={{color: '#1890ff'}}>{notif.user_from}</strong> has accepted your service exchange offer for their listing: <strong style={{color: '#1890ff'}}>{`${notif.user_from_listing_title}`}</strong>
                    </div>
                )
            default: 
                return 'Unknown notification type'
        }
    }

    // Wait to receive notifications before allowing the notifications dropdown to be opened
    useEffect(() => {
        if (!initialized && typeof notifications !== 'undefined') {
            setNotificationDropdown(() => {
                if (notifications.notifications.length > 0) {
                    return notifications.notifications.reduce((prev, notif, i) => {
                        return prev.concat(
                            {
                                key: (i + 1).toString(),
                                label: (
                                    <Link href={`/listing/${notif.user_from_listing_id}`}>
                                        {getDropdownMessage(notif)}
                                    </Link>
                                ),
                            }
                        )
                    }, [])
                } else {
                    return [{
                        key: '1',
                        label: <div>No notifications to display</div>,
                    }]
                }
            })
            setInitialized(true)
        }
    })

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

    // Mark notifications as seen
    const markNotificationsSeen = async () => {
        if (!isMarkedSeen && notifications.notifications.filter(item => !item.seen).length > 0) {
            await fetcher(token, `api/notification/seen/${user?.nickname}`, {
                method: 'POST'
            })
            .then( () => {
                setIsMarkedSeen(true)
            })
        }
    }

    return (
        <>
            <Row style={{background: '#008F8C', marginBottom: '20px'}}>
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
                    <div style={{display: 'flex', justifyContent: 'right', paddingRight: '15px', paddingTop: '8px'}}>
                        <Space size={15}>
                            <PlusCircleOutlined style={{ fontSize: 20, color: 'white' }} onClick={showCreateModal}/>
                            <Dropdown 
                                disabled={!initialized}  
                                placement="bottomRight"
                                overlay={
                                    <Menu
                                        items={notificationDropdown}
                                    />
                                }
                                onOpenChange={() => markNotificationsSeen()}
                            >
                                {initialized ? 
                                    <Badge 
                                        count={notifications.notifications.filter(item => !item.seen).length} 
                                        style={{ position: 'absolute', right: 0, top: 3 }} 
                                        size="small"
                                    >
                                        <NotificationOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                    </Badge>
                                    :
                                    <NotificationOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                }
                            </Dropdown>
                            <Dropdown overlay={ProfileDropdown} placement="bottomRight">
                                <UserOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                            </Dropdown>
                        </Space>
                    </div>
                </Col>
            </Row>
            { isCreateModalOpen && <CreateModal user={user} token={token} hideCreateModal={() => {setIsCreateModalOpen(false)}} />}
        </>
    )
}

export default HeaderComponent