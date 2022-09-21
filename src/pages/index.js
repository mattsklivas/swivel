// Import React
import React from 'react'
import {useUser} from '@auth0/nextjs-auth0'
import Link from 'next/link'

function Home() {
    const {user, error, isLoading} = useUser()

    if(isLoading) {
        return (
            <div>
                is loading...
            </div>
        )
    }

    if(error){
        return (
            <div>
                error.message
            </div>
        )
    }

    if(user) {
        return(
            <>
           <h1>{user.name} has logged in</h1> 
           <Link href="/api/auth/logout">Logout</Link>
            </>
        )        
        }

    return (
        <Link href="/api/auth/login">Login</Link>
    )
}

export default Home

