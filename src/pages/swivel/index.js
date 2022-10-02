 import Link from 'next/link'
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
                <Link href={`/swivel/${  swiv.id}`} key={swiv.id}>
                    <div className={styles.single}>
                        <h3>{swiv.name}</h3>                                                              
                         <p>{swiv.username}</p>
                         <p>{swiv.phone }</p>                        
                    </div>                    
                </Link>
            ))}
        </div>
     )
}
 
export default userListing