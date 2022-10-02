// import Link from 'next/link'
import React from 'react'
import styles from '../../styles/Listing.module.css'

// runs only on build time to fetch data
export const getStaticProps = async() =>{
    // returns a response object
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
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
            <h1>Users</h1>
            {swivel.map(swiv => (
                <div key={swiv.id}>
                    <h3 className={styles.single}>                                                              
                        {swiv.name}, {swiv.username}                           
                    </h3>                    
                </div>
            ))}
        </div>
     )
}
 
export default userListing