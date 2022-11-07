/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable quotes */
import { React, useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Space, Button, Tabs } from 'antd'
import { EyeInvisibleOutlined, TeamOutlined, StarOutlined } from '@ant-design/icons'
import auth0 from '../../../auth/auth0'
import LoadingComponent from '../../components/LoadingComponent'
import HeaderComponent from '../../components/HeaderComponent'
import EditProfileModal from '../../components/modals/EditProfileModal'
import ListComponent from '../../components/ListComponent'
import useUserDetails from '../../hooks/useUserDetails'
import useUserListings from '../../hooks/useUserListings'

export default function Profile({accessToken}) {
    const router = useRouter()

    // Get the username from the profile page
    const queryKey = 'user'
    const profileID = router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`))

    const {user, error, isLoading} = useUser()
    const token = accessToken

    const [isModalOpen, setIsModalOpen] = useState(false)
    
    // Get the user's details
    const { data: userDetails, error: userDetailsError } = useUserDetails(profileID, token)

    // Get the logged in user's details
    const { data: userDetailsLoggedIn } = useUserDetails(profileID, token)

    // Get the logged-in user's listings
    const { data: userListings } = useUserListings(user ? user.nickname : null, token)
    
    // Flag to check if hooks have completed
    const [initialized, setInitialized] = useState(false)

    // Wait for state variable initialization to show the page content
    useEffect(() => {
        // Redirect for unknown user
        if (userDetailsError) {
            router.push('/')
        } else if (!initialized && typeof userDetails !== 'undefined' && typeof userListings !== 'undefined' && typeof userDetailsLoggedIn !== 'undefined' && !isLoading) {
            setInitialized(true)
        }
    })

    const displayImage = () => {
        if(userDetails?.details?.avatar) {
            return (
                <div>
                    <img style={{display: 'flex', width: 200, height: 200, borderRadius: 5, aspectRatio: 9/2}} src={`data:image/jpeg;base64,${userDetails.details.avatar}`} />
                </div>
            )
        } else {
            return (
                <div>
                    <EyeInvisibleOutlined style={{justifyContent: 'center', fontSize: 20, alignItems: 'center', display: 'flex'}}/>
                    <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Image Not Available</span>
                </div>
            )
        }
    }
    // If the hooks have completed, display the page content
    if (user && initialized) {
        return (
            <>
                <HeaderComponent user={user}/>
                <div style={{backgroundColor: 'white', width: '95%', height: 'auto', borderRadius: '15px', padding: '5vh 5vh 3vh 5vh', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Space size={25} align="start">
                        <div style={{display: 'flex', height: 200, width: 200, borderRadius: 5, border: '2px solid grey', backgroundColor: '#FFFFFF'}}>
                            {displayImage()}
                        </div>
                        <Space direction="horizontal" align="start">
                            <Space direction="vertical" align="start">
                                <span style={{fontSize: '25px', fontWeight: 600}}>{`${userDetails.details.username}'s Profile`}</span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Name: </span><span style={{fontWeight: 400}}>{userDetails.details.fname && userDetails.details.lname ? `${userDetails.details.fname} ${userDetails.details.lname}` : 'Not Available'}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Email: </span><span style={{fontWeight: 400}}>{`${userDetails.details.email || 'Not available' }`}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Location: </span><span style={{fontWeight: 400}}>{`${userDetails.details.location || 'Not available' }`}</span></span>
                                <span style={{fontSize: '17px'}}><span style={{fontWeight: 500}}>Bio: </span><span style={{fontWeight: 400}}>{`${userDetails.details.description || 'Not available' }`}</span></span>  
                            </Space>
                        </Space>
                    </Space>
                    { userDetails.details.username === user.nickname &&
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
                                    <ListComponent listings={i ? userDetails.saved : userDetails.listings} category="all" user={user} saved={userDetailsLoggedIn.saved} userListings={userListings} token={token} canOffer={false} />
                                ),
                            }
                        })} />
                    { isModalOpen && <EditProfileModal hideModal={() => {setIsModalOpen(false)}} user={user} token={token} userDetails={userDetails.details}/>}
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

