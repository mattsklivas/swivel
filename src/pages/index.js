// Import React
import React from 'react'
import Link from 'next/link'
import {useUser } from '@auth0/nextjs-auth0'
import auth0 from './auth0'

export default function Home() {
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
            <div>
           <h1>{user.name} has logged in </h1> 
           <Link href="/api/auth/logout"><div>Logout</div></Link>
            
           <h2>profile page(page visiable only if logged in)</h2>
           <Link href="/locked/profile"><div> {user.name}</div></Link>
           <h2>access external api press button below (api accessable only if user logged in)</h2>
           <Link href="/api/membersAPI"><div> button </div></Link>
            </div>
            
        )  
        }

    return (
        <div>
        <Link href="/api/auth/login"><div>Login</div></Link>
        <h2>profile page(page visiable only if logged in)</h2>
        <Link href="/locked/profile"><div> profile </div></Link>
        <h2>access external api press button below (api accessable only if user logged in)</h2>
        <Link href="/api/membersAPI"><div> button </div></Link>
        </div>
    )
}

export async function getServerSideProps(context) {
    // Fetch data from external API
    const data = await auth0.getSession(context.req, context.res)

    // data contains both id and access token, and the user id
    // console.log(data)

    // Pass data to the page via props
    return { props: {  } }
  }