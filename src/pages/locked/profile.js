// pages/api/auth/[...auth0].js
import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

// content for registered users only, i.e.. block dashboard until user logged in 
const Dashboard = withPageAuthRequired(({ user }) => {
  return <p>Welcome the profile page of {user.name}</p>
})

export default Dashboard

// If you wrap your getServerSideProps with WithPageAuthRequired your 
// props object will be augmented with the user property, which will be the user's Claims
// below is the way to use it

// import auth0 from '../auth0'
// export default function Dashboard ({ user })  {
// return <p>Welcome the profile page of {user.name}</p>
// }

// export const getServerSideProps =  auth0.withPageAuthRequired()
