import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import styles from '../../styles/Listing.module.css'

// runs only on build time to fetch data for the route parameter
export const getStaticPaths = async() =>{
    // returns a response object
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    // Converts the json into an array of objects
    const data = await res.json()

    // Setting the parameters
    const paths = data.map(swivel =>{
        return {
            params: { id: swivel.id.toString()}
        }
    })
    
    return{
        paths,
        fallback: false // show 404 page if page is not found
    }
}

// This function will run depending how many paths were generated
// context will the parameters we need
export const getStaticProps = async (context) =>{
    const {id} = context.params
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${  id}`)
    const data = await res.json()

    return{
        props: { user: data}
    }
}

function Details({ user }) {
    return ( 
        <div>
            <h1>Name: { user.name }</h1>
            <p>email: { user.email }</p>
            <p>Location: { user.address.city}</p>
            <Link href="/swivel">
                <Button type="primary" className={styles.btn}>Go to Swivel listing </Button>
            </Link>
        </div>
     )
}
 
export default Details