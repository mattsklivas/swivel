import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
// content for registered users only
const Dashboard = withPageAuthRequired(({ user }) => {
  return <p>only for the select few {user.name}</p>
})

export default Dashboard