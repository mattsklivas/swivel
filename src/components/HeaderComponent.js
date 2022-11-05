/* eslint-disable jsx-a11y/no-static-element-interactions */
// Import React and Antd elements
import { React, useState, useEffect } from 'react'
import { Col, Row, Dropdown, Menu, Space, Badge, message } from 'antd'
import { UserOutlined, PlusCircleOutlined,NotificationOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import CreateModal from './modals/CreateModal'
import logo from '../../public/icon.svg'
import fetcher from '../helpers/fetcher'

function HeaderComponent(props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const user = props.user
    const token = props.token
    const [arr, setArr] = useState([]) // array created by us to display dynamic drop down from props.notif
    const values=[...arr]
    
    const onClick = ({ key }) => {
        message.info(`Click on item ${key}`)
        const notificationID = key.substring(0, key.indexOf('/')) // has the notifiaction id, use to delete the notification
        const userListingID = (key.substring(key.indexOf('/'))).replace('/','') // has the users listing id that has been affected. use to href to the page once clicked
        
        // call the endpoint to delete the notification once pressed

        // href to the appropriate listing id page ()
    }
    
    // dummy drop down list from antd  
    const items = [
        {
          label: '1st menu item',
          key: '1',
        },
        {
          label: '2nd menu item',
          key: '2',
        },
        {
          label: '3rd menu item',
          key: '3',
        },
    ]

    function createLabel(x){
        if(x.type ==='offer made'){
            return `${x.otherUser} has made an offer for ${x.primaryUserOffer}` // notification for offer made
        }else{
            return `You have accepted ${x.otherUser}'s offer for ${x.otherUserOffer}` // notification for accepted offer
        }
    }   

    // function to  parse the notifications and create a array for the drop down component
    function parseNotif(){
        if ((arr === undefined || arr.length === 0) && props.notif.length>0) { // set the array for drop down component, from prop.notif
            props.notif.map((item) =>
            values.push({ label: createLabel( item), key: item._id.concat('/',item.primaryUserId)},)) 
            // key has ( the id for the notification/ listing id of the users listing)
            // label has the appropriate notification label to display on the screen
            setArr(values)
        }
        return values
    }

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

    useEffect(() => { 
        // enable this to work with notification data, 
      // parseNotif() // parses notification data 
    },[])

    console.log(arr) // array created by us to display in drop down from props.notif
    console.log(items) // dummy array from ant design
    // console.log(props.notif) // values received from the index page props. 

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
                            <Dropdown menu={{items, onClick}} placement="bottomRight" >
                                <Badge count={items.length} style={{ position: 'absolute', right: 0, top: 0 }} size="small">
                                    <NotificationOutlined style={{ fontSize: 20, color: 'white', cursor: 'pointer' }}/>
                                </Badge>
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