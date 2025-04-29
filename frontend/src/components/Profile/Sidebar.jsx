import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import {useDispatch, useSelector} from "react-redux"
import {authActions} from "../../store/auth"
import toast from 'react-hot-toast'


export default function Sidebar({data}) {
  const dispatch =useDispatch()
  const history=useNavigate()
  const role=useSelector((state)=>state.auth.role)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    dispatch(authActions.logout());
    toast.success('Logged out successfully!');
    history("/")
  }

  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-around h-[100%] '>

<div className='flex items-center flex-col justify-center'>

      <img src={data.avatar} className='h-[12vh]'/>
      <p className='mt-3 text-xl text-zinc-100 font font-semibold'>{data.username}</p>
      <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>

      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden md:block'></div>
</div>
    {role==="user" && <div>
      <div className='w-full flex-col items-center justify-center flex'>
        <Link to="/profile" className='text-inc-100 font-semibold w-full py-2 px-7 text-center hover:bg-zinc-900 rounded transition-all'>
        Favourites</Link>
      </div>

      <div className='w-full flex-col items-center justify-center  flex'>
        <Link to="/profile/orderHistory" className='text-inc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
        Order History</Link>
      </div>

      <div className='w-full flex-col items-center justify-center  flex'>
        <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
        Settings</Link>
      </div>
      </div>}

      {role==="admin" && 
      <div>
      <div className=' w-full flex-col items-center justify-center flex'>
        <Link to="/profile" className='text-inc-100 font-semibold w-full py-2 px-7 text-center hover:bg-zinc-900 rounded transition-all'>
       All Orders</Link>
      </div>

      <div className='w-full flex-col items-center justify-center  flex'>
        <Link to="/profile/add-book" className='text-inc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
        Add Book</Link>
      </div>

      {/* <div className='w-full flex-col items-center justify-center  flex'>
        <Link to="/profile/settings" className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all'>
        Settings</Link>
      </div> */}
      </div>}
    <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font -semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
    onClick={handleLogout}
    >
    Logout <MdLogout /></button>

    </div>
  )
}
