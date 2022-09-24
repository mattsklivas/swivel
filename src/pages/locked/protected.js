import React from 'react'
import auth0 from '../auth0'

// another way of protecting a page if user is not logged in, when get serversideprops is required. 
export default function Protected() {
  return <div>Protected page</div>
}

export const getServerSideProps = auth0.getServerSidePropsWrapper(async (ctx) => {
  const session = auth0.getSession(ctx.req, ctx.res)
  if (session) {
    // User is authenticated
  } else {
    // User is not authenticated
  }

  return { props: {  } }
})