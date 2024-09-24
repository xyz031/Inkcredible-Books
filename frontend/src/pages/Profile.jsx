import React,{useEffect, useState} from 'react'
import Sidebar from "../components/Profile/Sidebar"
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/Loader/Loader'

export default function Profile() {
  // const isLoggedIn=useSelector();
  const [Profile,setProfile]=useState()
  const headers={
    id:localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
    
  }
  useEffect(() => {
    const fetch=async()=>{
      const response=await axios.get("http://localhost:1000/api/v1/get-user-information",{headers})
      setProfile(response.data)
    }
  fetch()
 
  }, [])
  

  return (



    <div className='bg-zinc-900 text-white px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4'>
    {!Profile && <div className='w-full h-[100%] flex items-center justify-center my-8'><Loader/></div>}
    { Profile && <>
    
      <div className='w-full md:w-2/6 h-screen'>
        <Sidebar data={Profile}/>
      </div>
      <div className='w-full '>
        <Outlet/>
      </div>
    </>}
    </div>
  )
}
