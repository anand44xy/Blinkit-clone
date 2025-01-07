import React from 'react'
import Search from './Search'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";

function Header() {
    const navigate = useNavigate()
    const redirectToLoginPage = () => {
        navigate("/login")
    }

    return (
        <header className='p-2 py-4 shadow-custom-header sticky top-0 z-50 bg-white'>
            <nav className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
                {/* Blinkit Logo */}
                <Link to={'/'} className='flex items-center justify-start space-x-4 border-r '>
                    <img src="blinkit.png" alt="logo" className='h-14 w-auto overflow-hidden ' />
                </Link>

                {/* Search bar */}
                <div>
                    <Search />
                </div>

                {/* Login & Cart */}
                <div className='flex items-center'>
                    {/* User icon for mobile device */}
                    <button className='block lg:hidden'>
                        <FaRegUserCircle size={26} />
                    </button>

                    <button onClick={redirectToLoginPage} className='font-sans text-xl pr-16 hidden lg:block'>
                        Login
                    </button>

                    <button className="bg-[#0c831f] text-white px-2 rounded-lg hidden lg:flex items-center space-x-2 ">
                        <div className=''><HiOutlineShoppingCart size={26} /></div>
                        <div><p className='font-bold'> 6 items <br /> ₹1236 </p></div>
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Header
