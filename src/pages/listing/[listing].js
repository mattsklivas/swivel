/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
// Import React
import { React, useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Space, Button, Tabs, Popconfirm } from 'antd'
import { EyeInvisibleOutlined, TeamOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import auth0 from '../../../auth/auth0'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderComponent from '../../components/HeaderComponent'
// import OfferModal from '../../components/OfferModal'
import EditListingModal from '../../components/modals/EditListingModal'
import ListComponent from '../../components/ListComponent'
import useListing from '../../hooks/useListing'
import useUserListings from '../../hooks/useUserListings'
import fetcher from '../../helpers/fetcher'
import { CATEGORIES } from '../../helpers/categories'

export default function Listing({accessToken}) {
    const router = useRouter()

    const {user, error, isLoading} = useUser()
    const token = accessToken

    // Get the listing id from the listing page
    const queryKey = 'listing'
    const listingID = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // Get the listing details
    const { data: listing } = useListing(listingID, token)

    // Get the logged-in user's listings
    const { data: userListings } = useUserListings(user ? user.nickname : '', token)

    // Flag to check if hooks have completed
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        if (!initialized && typeof listing !== 'undefined' && typeof userListings !== 'undefined' && !isLoading) {
            setInitialized(true)
        }
    })

    // Delete confirmation popup state variables
    const [openConfirm, setOpenConfirm] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    // Update listing state variable
    const [showUpdateModal, setShowUpdateModal] = useState(false)

    // Show delete confirmation
    const showDeleteConfirm = () => {
        setOpenConfirm(true)
    }

    // Handle delete confirmation
    const handleDelete = async () => {
        setConfirmLoading(true)
        
        await fetcher(token, `api/listing/${listingID}`, {
            method: 'DELETE',
        })
        .then( () => {
            setOpenConfirm(false)
            setConfirmLoading(false)
        })
        .then( () => {
            // Redirect to homepage following deletion
            router.push('/')
        })
        .catch(() => { 
            setOpenConfirm(false)
            setConfirmLoading(false)
        })
    }

    // Handle delete cancellation
    const handleCancel = () => {
        setOpenConfirm(false)
    }

    // Handle displaying of listing update modal
    const handleShowUpdateModal = () => {
        setShowUpdateModal(true)
    }

    // If the hooks have completed, display the page content
    if (user && initialized) {
        return (
            <>
                <HeaderComponent user={user}/>
                <div style={{backgroundColor: 'white', width: '95%', height: 'auto', borderRadius: '15px', padding: '5vh 5vh 3vh 5vh', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Space size={25} align="start">
                        <div style={{height: 200, width: 200, borderRadius: 5, border: '2px solid grey', padding: 5, backgroundColor: '#FFFFFF', marginTop: '10px'}}>
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '37%'}}>
                                <EyeInvisibleOutlined style={{fontSize: 20}}/>
                            </div>
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Image Not Available</span>
                        </div>
                        <Space direction="horizontal" align="start">
                            <Space direction="vertical" align="start">
                                <span style={{fontSize: '25px', fontWeight: 600}}>{listing.title}</span>
                                <div style={{fontSize: '14px'}}>
                                <Space direction="horizontal" align="start">
                                    <FileTextOutlined style={{fontSize: 20}}/>
                                    <span>{listing.description.length > 340 ? `${listing.description.substring(0, 340)}...` : listing.description}</span>
                                </Space>
                                </div>
                                <div style={{fontSize: '14px', cursor: 'pointer'}} onClick={() => {router.push(`/profile/${listing.creator}`)}}>
                                    <UserOutlined style={{fontSize: 20}}/>
                                    <span style={{paddingLeft: 5}}>{`${listing.creator}`}</span>
                                </div>
                                <div style={{fontSize: '14px'}}>
                                    <CalendarOutlined style={{fontSize: 20}}/>
                                    <span style={{paddingLeft: 5}}>{`${listing.date_created.split('T')[0]}`}</span>
                                </div>
                                <div style={{fontSize: '14px'}}>
                                    <AppstoreOutlined style={{fontSize: 20}}/>
                                    <span style={{paddingLeft: 5}}>{CATEGORIES[listing.category]}</span>
                                </div>
                                { listing.creator === user.nickname &&
                                    <Space direction="horizontal" align="start">
                                        <Button onClick={handleShowUpdateModal}>Modify</Button>
                                        <Popconfirm
                                            title="Are you sure you wish to delete this listing?"
                                            open={openConfirm}
                                            onConfirm={handleDelete}
                                            okButtonProps={{ loading: confirmLoading }}
                                            onCancel={handleCancel}
                                        >
                                            <Button danger type="primary" onClick={showDeleteConfirm} loading={confirmLoading}>Delete</Button>
                                        </Popconfirm>
                                    </Space>
                                }
                            </Space>
                        </Space>
                    </Space>
                    <Tabs
                        centered
                        style={{padding: '20px 0 0 0'}}
                        defaultActiveKey="1"
                        items={[TeamOutlined, UserOutlined].map((Icon, i) => {
                            const id = String(i + 1)
                            const title = !i ? 'All Offers' : 'My Offers'

                            return {
                                label: (
                                    <span>
                                        <Icon />
                                        {title}
                                    </span>
                                ),
                                key: id,
                                children: (
                                    <ListComponent listings={!i ? listing.offers : listing.myOffers} category="all" user={user} userListings={userListings} canOffer/>
                                ),
                            }
                        })} />
                    { showUpdateModal && <EditListingModal hideModal={() => {setShowUpdateModal(false)}} listing={listing} token={token} />}
                </div>
                <div style={{height: 30}}/>
            </>
        )
    // If the hooks are loading
    } else if (!initialized && isLoading) {
        return (
            <LoadingComponent
                message="Loading..."
            />
        )
    // If no user was found, redirect to login page
    } else if (!isLoading && !user) {
        router.push('/api/auth/login')
    }
}

export const getServerSideProps = async (context) => {
    // Fetch data from external API
    let accessToken = await auth0.getSession(context.req, context.res) || null
    if (accessToken != null)  {
        accessToken = accessToken.idToken
    }

    // Pass data to the page via props
    return { props: {accessToken} }
}

