/* eslint-disable quotes */
import { React, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Space, Button, Tabs } from 'antd'
import { EyeInvisibleOutlined, TeamOutlined, StarOutlined } from '@ant-design/icons'
import auth0 from '../../../auth/auth0'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderComponent from '../../components/HeaderComponent'
import EditProfileModal from '../../components/EditProfileModal'
import ListComponent from '../../components/ListComponent'
import useUserDetails from '../../hooks/useUserDetails'
import useListingsUser from '../../hooks/useListingsUser'

export default function Profile({accessToken}) {
    const router = useRouter()

    // Get the username from the profile page
    const queryKey = 'user'
    const profileID = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    const {user, error, isLoading} = useUser()
    const token = accessToken

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // Get the user's details
    let { userDetails, userDetailsLoading, UserDetailsError } = useUserDetails(profileID, token)

    // Get the logged-in user's listings
    let { listingsUser, listingsUserLoading, listingsUserError } = useListingsUser(user ? user.nickname : '', token)

    let listings = [
        {
            creator: 'mattsklivas',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'mattsklivas',
            category: 'trades',
            title: 'This is a listing title',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        },
        {
            creator: 'mattsklivas',
            category: 'trades',
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            title: 'This is a listing title',
            date_created: '20/09/2022',
            image: null,
            offers: ['1', '2', '3']
        }
    ]

    let saved = [
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

    userDetails = {
        username: 'mattsklivas',
        category: 'trades',
        title: 'This is a listing title',
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date_created: '20/09/2022',
        image: null,
        listings: listings,
        saved: saved,
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
                            <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Avatar Not Found</span>
                        </div>
                        <Space direction="horizontal" align="start">
                            <Space direction="vertical" align="start">
                                <span style={{fontSize: '25px', fontWeight: 600}}>{`${userDetails.username}'s Profile`}</span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Name: </span><span style={{fontWeight: 400}}>{userDetails.fname && userDetails.lname ? `${userDetails.fname} ${userDetails.lname}` : 'Not Available'}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Email: </span><span style={{fontWeight: 400}}>{`${userDetails.email || 'Not available' }`}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Location: </span><span style={{fontWeight: 400}}>{`${userDetails.location || 'Not available' }`}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Bio: </span><span style={{fontWeight: 400}}>{`${userDetails.description || 'Not available' }`}</span></span>  
                            </Space>
                        </Space>
                    </Space>
                    { userDetails.username === user.nickname &&
                        <Button style={{position: 'absolute', right: '80px', top: '100px'}} type="primary" onClick={() => setIsModalOpen(true)}>Edit Profile</Button>
                    }
                    <Tabs
                        centered
                        style={{padding: '20px 0 0 0'}}
                        defaultActiveKey="1"
                        items={[TeamOutlined, StarOutlined].map((Icon, i) => {
                            const id = String(i + 1)
                            const title = i ? 'Saved Listings' : "User's Listings"

                            return {
                                label: (
                                    <span>
                                        <Icon />
                                        {title}
                                    </span>
                                ),
                                key: id,
                                children: (
                                    <ListComponent listings={i ? userDetails.saved : userDetails.listings} category="all" user={user} userListings={listingsUser} canOffer={false} />
                                ),
                            }
                        })} />
                    { isModalOpen && <EditProfileModal hideModal={() => {setIsModalOpen(false)}} userDetails={userDetails} />}
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

