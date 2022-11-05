import React, {useState} from 'react'

function NavBar() {
  return (
    //fragments below
    <>
        <nav className="navbar">
            <div className='navbar-container'>
                <Link to="/" className="navbar-logo">
                LOGO
                </Link>
            </div>
        </nav>
    </>
  )

}

export default NavBar