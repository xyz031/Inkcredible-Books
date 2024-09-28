import React from 'react'
import {Link} from "react-router-dom"

export default function MobileNav() {
  return (
    <div className='w-full flex items-center justify-between'>
        <Link to="/profile"
        className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded tranition-all duration-300'>

            Favourites
        </Link>
        <Link to="/profile/orderHistory"
        className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded tranition-all duration-300'>
            Order History
        </Link>
    </div>
  )
}
