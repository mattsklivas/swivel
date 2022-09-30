import React from 'react'
import auth0 from '../auth0'

// another way of protecting a page if user is not logged in, when get serversideprops is required. 
export default function Protected({data}) {
  return (
    <div>Protected page, {data}</div>
)
}

export const getServerSideProps = auth0.getServerSidePropsWrapper(async (context) => {
  const session = auth0.getSession(context.req, context.res)
  let data 
  if (session) {
    // User is authenticated
     data = ' you are in'
  } else {
    // User is not authenticated
    data = 'get out'
  }

  return { props: { data } }
})