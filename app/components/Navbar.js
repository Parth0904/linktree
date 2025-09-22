import React from 'react'
 import Link from 'next/link'

const Navbar = () => {
    return (
   <nav className='flex justify-between items-center bg-white w-[90vw] p-4 mx-auto my-12 left-[5vw] rounded-full fixed'>
    <div className="logo flex justify-between gap-12">
    <Link href={"/"}>
        <img className='w-28 h-6' src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" />
        </Link>

        <ul className='flex gap-10'>
            <li>Products</li>
            <li>Templates</li>
            <li>Marketplace</li>
            <li>Learn</li>
            <li>Pricing</li>
        </ul>
    </div>
    <div className='flex gap-4'>
        <button className='rounded-lg bg-gray-200 text-black m-0 px-6 py-4'>Log in</button>
        <button className='rounded-full bg-black text-white m-0 px-6 py-4'>Sign up free</button>
    </div>
   </nav >
  )
}

export default Navbar
