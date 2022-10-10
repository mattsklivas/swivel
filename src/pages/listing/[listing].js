/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-shorthand */
/* eslint-disable quotes */
// Import React
import { React, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Space, Button, Tabs, Popconfirm } from 'antd'
import { EyeInvisibleOutlined, TeamOutlined, UserOutlined, CalendarOutlined, AppstoreOutlined, FileTextOutlined } from '@ant-design/icons'
import auth0 from '../../../auth/auth0'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderComponent from '../../components/HeaderComponent'
// import OfferModal from '../../components/OfferModal'
import ListComponent from '../../components/ListComponent'
import useListing from '../../hooks/useListing'
import useListingsUser from '../../hooks/useListingsUser'
import fetcher from '../../helpers/fetcher'

// Global categories object
const CATEGORIES = {
    trades : 'Trades & Construction',
    coding : 'Programming & Tech',
    music : 'Music & Audio',
    art : 'Art & Fashion',
    marketing : 'Marketing',
    other : 'Other'
}

export default function Listing({accessToken}) {
    const router = useRouter()

    const {user, error, isLoading} = useUser()
    const token = accessToken

    // Get the listing id from the listing page
    const queryKey = 'listing'
    const listingID = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // Get the listing details
    let { listing, listingLoading, listingError } = useListing(listingID, token)

    // Get the logged-in user's listings
    let { listingsUser, listingsUserLoading, listingsUserError } = useListingsUser(user ? user.nickname : '', token)

    // Delete confirmation popup state variables
    const [open, setOpen] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    // Show delete confirmation
    const showDeleteConfirm = () => {
        setOpen(true)
    }

    // Handle delete confirmation
    const handleOk = async () => {
        setConfirmLoading(true)
        
        await fetcher('api/listing', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: listing.id
            }),
        })
        .then( () => {
            setOpen(false)
            setConfirmLoading(false)
        })
        .then( () => {
            // Redirect to homepage following deletion
            router.push('/')
        })
        .catch(() => { 
            setOpen(false)
            setConfirmLoading(false)
        })
    }

    // Handle delete cancellation
    const handleCancel = () => {
        setOpen(false)
    }

    let offers = [
        {
            creator: 'username',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'username',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'username',
            category: 'trades',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        }
    ]

    let myOffers = [
        {
            creator: 'mattsklivas',
            category: 'music',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title2',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'mattsklivas',
            category: 'music',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title2',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'mattsklivas',
            category: 'music',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title2',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        }
    ]

    listing = {
        creator: 'mattsklivas',
        category: 'trades',
        title: 'This is a listing title',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date_created: '20/09/2022',
        image: null,
        offers: offers,
        myOffers: myOffers
    }

    listingsUser = [
        {
            id: '123',
            creator: 'mattsklivas',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            id: '123',
            creator: 'mattsklivas',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            id: '123',
            creator: 'mattsklivas',
            category: 'trades',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            id: '123',
            creator: 'mattsklivas',
            category: 'music',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        }
    ]

    if (user && !isLoading) {
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
                                <span style={{paddingLeft: 5}}>{`${listing.date_created}`}</span>
                            </div>
                            <div style={{fontSize: '14px'}}>
                                <AppstoreOutlined style={{fontSize: 20}}/>
                                <span style={{paddingLeft: 5}}>{CATEGORIES[listing.category]}</span>
                            </div>
                            </Space>
                        </Space>
                    </Space>
                    { listing.creator === user.nickname &&
                        <Popconfirm
                            style={{float: 'right', marginTop: '-40px'}}
                            title="Are you sure you wish to delete this listing?"
                            open={open}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={handleCancel}
                        >
                            <Button danger type="primary" style={{float: 'right', marginTop: '-40px'}} onClick={showDeleteConfirm}>Delete Listing</Button>
                        </Popconfirm>
                    }
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
                                    <ListComponent listings={!i ? listing.offers : listing.myOffers} category="all" user={user} userListings={listingsUser} canOffer/>
                                ),
                            }
                        })} />
                    {/* { isModalOpen && <OfferModal hideModal={() => {setIsModalOpen(false)}} listing={listing} userListings={listingsUser} />} */}
                </div>
                <div style={{height: 30}}/>
            </>
        )
    } else if (isLoading) {
        return (
            <LoadingComponent
                message="Loading..."
            />
        )
    } else {
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

