import React from 'react'
import Link from 'next/link'

function NavBar() {
    return ( 
        <nav>
            <div className="logo">
                <h1>Swivel</h1>
            </div>
            <Link href="/">Home</Link>
            <Link href="/profile">Profile</Link>
        </nav>
     )
}
 
export default NavBar