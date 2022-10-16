/* eslint-disable quotes */
// import { React, useEffect } from 'react'
import { React, useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'
import auth0 from '../../auth/auth0'
import LoadingComponent from '../components/LoadingComponent'
import HeaderComponent from '../components/HeaderComponent'
import ListComponent from '../components/ListComponent'
import useListingsAll from '../hooks/useListingsAll'
import useUserListings from '../hooks/useUserListings'
import useUserDetails from '../hooks/useUserDetails'

// Global categories object
const CATEGORIES = {
    all : 'All',
    trades : 'Trades & Construction',
    coding : 'Programming & Tech',
    music : 'Music & Audio',
    art : 'Art & Fashion',
    marketing : 'Marketing',
    other : 'Other'
}

export default function Home({accessToken}) {
    const router = useRouter()
    const {user, error, isLoading} = useUser()
    const token = accessToken

    // Get all listings
    const { data: listings } = useListingsAll(token)

    // Get the logged-in user's listings
    const { data: userListings } = useUserListings(user ? user.nickname : null, token)

    // Get the logged-in user's details
    const { data: userDetails } = useUserDetails(user ? user.nickname : '', token)
    
    // Flag to check if hooks have completed
    const [initialized, setInitialized] = useState(false)

    // Wait for state variable initialization to show the page content
    useEffect(() => {
        if (!initialized && typeof listings !== 'undefined' && typeof userListings !== 'undefined' && typeof userDetails !== 'undefined' && !isLoading) {
            setInitialized(true)
        }
    })

    // If the hooks have completed, display the page content
    if (user && initialized) {
        return (
            <>
                <HeaderComponent user={user} token={token}/>
                <div style={{backgroundColor: 'white', width: '95%', height: 'auto', borderRadius: '15px', padding: '3vh 5vh 3vh 5vh', marginLeft: 'auto', marginRight: 'auto'}}>
                    <Tabs
                        centered
                        defaultActiveKey="1"
                        items={Object.keys(CATEGORIES).map((categoryKey, i) => {
                            const id = String(i + 1)

                            return {
                                label: (
                                    <span>
                                        {CATEGORIES[categoryKey]}
                                    </span>
                                ),
                                key: id,
                                children: (
                                    <ListComponent listings={listings} category={categoryKey} user={user} userListings={userListings} saved={userDetails.saved} token={token} canOffer/>
                                ),
                            }
                        })} />
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

