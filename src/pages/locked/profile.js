// pages/api/auth/[...auth0].js
import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

// content for registered users only, i.e.. block dashboard until user logged in 
const Dashboard = withPageAuthRequired(({ user }) => {
  return <p>Welcome the profile page of {user.name}</p>
})

export default Dashboard