import Link from 'next/link'
import React from 'react'
import Router from 'next/router'

const notFound = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(()=>{
        setTimeout(()=>{
            Router.push('/')
        },4000)
    }, [])

    return ( 
        <div className="not-found">
            <h1>Oooops...</h1>
            <h2>404 | That page cannot be found.</h2>
            <p>Go back to the <Link href="/">Home</Link></p>
        </div>
     )
}
 
export default notFound 