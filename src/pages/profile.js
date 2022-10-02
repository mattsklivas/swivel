import Head from 'next/head'
import React from 'react'

function Profile() {
    return ( 
        <>
            <Head>
                <title>Swivel | Profile</title>
                <metadata name="keywords" content="swivel"/>
            </Head>
            <div>
                <h1> Username: Jackey</h1>     
                <h1> Email: </h1>     
            </div> 
        </>                    
     )
}
 
export default Profile