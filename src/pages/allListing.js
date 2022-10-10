/* eslint-disable quotes */
// import { React, useEffect } from 'react'
import { React } from 'react'
// import { useUser } from '@auth0/nextjs-auth0'
// import { useRouter } from 'next/router'
// import { Tabs } from 'antd'
import Link from 'next/link'
// import auth0 from './auth0'
// import LoadingComponent from '../components/LoadingComponent'
// import HeaderComponent from '../components/HeaderComponent'
// import ListComponent from '../components/ListComponent'
// import useListingsAll from '../hooks/useListingsAll'
// import useListingsUser from '../hooks/useListingsUser'
import styles from '../styles/Listing.module.css'

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

// runs only on build time to fetch data
export const getStaticProps = async() =>{
    // returns a response object
    const res = await fetch('http://localhost:3000/api/listing/all')
    // Converts the json into an array of objects
    const data = await res.json()

    // return that data
    return{
        props: { swivel: data}
    }
}
const userListing = ({swivel}) => {
    return ( 
        <div>
            <h1>Listing</h1>
            {swivel.map(swiv => (
                <Link href={`/swivel/${  swiv.id}`} key={swiv.id}>
                    <div className={styles.single}>
                        <h3>{swiv.creator}</h3>                                                              
                         <p>{swiv.title}</p>
                         <p>{swiv.description}</p>                        
                    </div>                    
                </Link>
            ))}
        </div>
     )
}
export default userListing