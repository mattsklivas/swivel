/* eslint-disable quotes */
import { React, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import { Tabs } from 'antd'
import auth0 from './auth0'
import LoadingComponent from '../components/LoadingComponent'
import HeaderComponent from '../components/HeaderComponent'
import ListComponent from '../components/ListComponent'
import useListingsAll from '../hooks/useListingsAll'
import useListingsUser from '../hooks/useListingsUser'

// Global categories object
const CATEGORIES = {
    all: "All",
    trades : "Trades & Construction",
    coding : "Programming & Tech",
    music : "Music & Audio",
    art : "Art & Fashion",
    marketing : "Marketing",
    other : "Other"
}

export default function Home({accessToken}) {
    const router = useRouter()
    const {user, error, isLoading} = useUser()
    const token = accessToken

    // Get all listings
    let { listings, listingsLoading, listingsError } = useListingsAll(token)

    // Get the logged-in user's listings
    let { listingsUser, listingsUserLoading, listingsUserError } = useListingsUser(user ? user.nickname : '', token)
     
    console.log(listingsUser)
    useEffect(() => {
        console.log(listings,listingsLoading, listingsError )
    })
    // listings = [
    //     {
    //         id: '123',
    //         creator: 'mattsklivas',
    //         category: 'trades',
    //         title: 'This is a listing title',
    //         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         date_created: '20/09/2022',
    //         image: null,
    //         offers: ['1', '2', '3']
    //     },
    //     {
    //         id: '123',
    //         creator: 'mattsklivas',
    //         category: 'trades',
    //         title: 'This is a listing title',
    //         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         date_created: '20/09/2022',
    //         image: null,
    //         offers: ['1', '2', '3']
    //     },
    //     {
    //         id: '123',
    //         creator: 'mattsklivas',
    //         category: 'trades',
    //         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         title: 'This is a listing title',
    //         date_created: '20/09/2022',
    //         image: null,
    //         offers: ['1', '2', '3']
    //     },
    //     {
    //         id: '123',
    //         creator: 'mattsklivas',
    //         category: 'music',
    //         description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    //         title: 'This is a listing title',
    //         date_created: '20/09/2022',
    //         image: null,
    //         offers: ['1', '2', '3']
    //     }
    // ]

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
                <div style={{backgroundColor: 'white', width: '95%', height: 'auto', borderRadius: '15px', padding: '3vh 5vh 3vh 5vh', marginLeft: 'auto', marginRight: 'auto'}}>
                    {/* <Tabs
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
                                    <ListComponent listings={listings} category={categoryKey} user={user} userListings={listingsUser} canOffer/>
                                ),
                            }
                        })} /> */}
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

