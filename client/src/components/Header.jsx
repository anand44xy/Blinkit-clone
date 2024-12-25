import React from 'react'

function Header() {
    return (
        <header className='p-2 shadow-custom-header sticky top-0'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
                {/* Logo */}
                <div className='flex items-center justify-start space-x-4'>
                    <a href=""><img src="blinkit.png" alt="logo" className='h-14 w-auto overflow-hidden' /></a>
                </div>

                {/* Search bar */}
                <div className='w-full md:w-1/2 my-4 md:my-0 relative'>
                    <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600"></i>
                    <input
                        type="input"
                        placeholder='Search for items '
                        className='w-full pl-24 p-2 border border-gray-300 rounded-md focus:outline-none bg-[#f8f8f8]'
                    />
                </div>

                {/* Cart */}
                <div className='flex items-center'>
                    <a href="">
                        <span className='font-sans text-xl pr-16'>Login</span>
                    </a>
                    <button className="bg-green-600 text-white px-10 py-5 rounded-lg flex items-center space-x-2">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header
