import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'

export default function Settings() {

  const [Value,setValue]=useState({address:""})
  const [ProfileData,setProfileData]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
  const fetch=async()=>{
    const response=await axios.get("http://localhost:1000/api/v1/get-user-information",{headers})
    setProfileData(response.data)
  
    setValue({address:response.data.address})
  }
  fetch()
  }, [])
  

  return (
    <>
    {!ProfileData && <Loader/>}{" "}
    {ProfileData && (
      <div className='flex-gap-12'>
      <div className=''>
        <label htmlFor="">Username</label>
        <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
          {ProfileData.username}
        </p>
      </div>
      <div className=''>
      <label htmlFor="">Email</label>
        <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
          {ProfileData.email}
        </p>
      </div>
      </div>
    )}
    </>
  )
}
