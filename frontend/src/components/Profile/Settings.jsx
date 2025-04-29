import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { toast } from 'react-hot-toast'

export default function Settings() {

  const [Value,setValue]=useState({address:""})
  const [ProfileData,setProfileData]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
  const fetch=async()=>{
    const response=await axios.get("https://inkcredible-books.onrender.com/api/v1/get-user-information",{headers})
    setProfileData(response.data)
  
    setValue({address:response.data.address})
  }
  fetch()
  }, [])


  const change=(e)=>{
    const {name,value}=e.target
    setValue({...Value,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:1000/api/v1/update-address',
        {
          username: ProfileData.username,
          email: ProfileData.email,
          address: Value.address
        },
        { headers }
      );
      toast.success(response.data.message || 'Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

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

      <div className='mt-4 flex flex-col'>
      <label htmlFor="">Address</label>
        <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
        rows="5"
        placeholder='Address'
        name='address'
        value={Value.address}
        onChange={change}
        />
          {/* {ProfileData.address}
        </textarea> */}
      </div>

      <div className='mt-4 flex flex-end'>

        <button className='p-2 rounded bg-yellow-500 text-zinc-900 mt-2 py-2 px-3 font-semibold hover:bg-yellow-400 ' onClick={handleSubmit}>
          Update
        </button>
      </div>
      </div>
    )}
    </>
  )
}
