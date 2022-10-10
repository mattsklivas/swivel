// Import React
import React from 'react'
import Footer from './FooterComponent'
import { useUser } from '@auth0/nextjs-auth0'

function Layout({children}) {
    return ( 
        <div className="content">
            {children}
             <Footer/>
        </div>
     )
}
 
export default Layout