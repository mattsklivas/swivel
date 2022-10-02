import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function NavBar() {
    return ( 
        <nav>
            <div className="logo">
                <h1>
                    <Link href="/">
                        Swivel              
                    </Link>
                    <Image className="image" src="/logo.png" width={50} height={50}/>  
                </h1>
      
            </div>
            {/* <Link href="/">Home</Link> */}
            <Link href="/profile">Profile</Link>
        </nav>
     )
}
 
export default NavBar