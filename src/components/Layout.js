// Import React
import React from 'react'
import Footer from './Footer'
import NavBar from './NavBar'

function Layout({children}) {
    return ( 
        <div className="content">
            <NavBar/>
            {children}
            <Footer/>
        </div>
     )
}
 
export default Layout

