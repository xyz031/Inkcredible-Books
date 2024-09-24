import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Loader from "../Loader/Loader"
import {Link} from "react-router-dom"
export default function UserOrderHistory() {

  const [OrderHistory,setOrderHistory]=useState()
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }

  useEffect(()=>{
    const fetch=async()=>{
      const response=await axios.get(
        "http://localhost:1000/api/v1/get-order-history",{headers}
      )
    setOrderHistory(response.data.data)
    } 
    fetch()
  },[])

  return (
   < div className='h-screen '>
   {!OrderHistory && <div className=' flex items-center justify-center h-[100%]'><Loader/></div>}
   {OrderHistory && OrderHistory.length===0 && (
    <div className='h-[80vh] p-4 text-zinc-100'>
      <div className='[h-100%] flex flex-col items-center'>
        <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
          No Order History
        </h1>
       </div>
    </div>
   )}

{OrderHistory && OrderHistory.length>0 && (
 <div className='p-0 h-[80vh] md:p-4 text-zinc-100'>
 <div className='[h-100%] flex flex-col items-center'>
   <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
     Your Order History
   </h1>
   <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-8 flex gap-2'>
     <div className='w-[3%]'>
       <h1 className='text-center'>Sr.</h1>
     </div>
     <div className='w-[22%]'>
       <h1 className='text-center'>Books</h1>
     </div>
     <div className='w-[45%]'>
       <h1 className='text-center'>Description</h1>
     </div>
     <div className=' w-[9%]'>
     <h1 className='text-center'>Price</h1>
     </div>
     <div className='px-2 w-[16%]'>
       <h1 className='text-center'>Status</h1>
     </div>
     <div className='w-none md:w-[5%] hidden md:block'>
       <h1 className='text-center'>Mode</h1>
     </div>
   </div>
   {OrderHistory.map((items,i)=>(
    <div className='bg-zinc-800 w-full rounded py-2 px-4 hover:bg-zinc-900 hover:cursor-pointer flex'>
     <div className='w-[3%]'>
      <h1 className='text-center'>{i+1}</h1>
      </div>
      <div className='px-1 w-[22%] text-center'>
        <Link to={`/view-book-details/${items.book._id}`} className=' hover:text-blue-300 '>
        {items.book.title}
        </Link>
        </div>
        <div className='w-[45%]'>
          <h1 className='text-center'>{items.book.desc.slice(0,50)} ...</h1>
        </div>
        <div className='w-[9%]'>
          <h1 className='text-center'>{items.book.price}</h1>
        </div>
        <div className='px-3 w-[16%]'>
          <h1 className='text-center font-semibold text-green-500'>
            {items.status=="Order placed" ?(
              <div className='text-yellow-500'>{items.status}</div>
            ):items.status=="Canceled" ?(
              <div className='text-red-500'>{items.status}</div>

            ):(items.status)
          }
          </h1>
        </div>
        <div className='max-w-none md:w-[5%] hidden md:block'>
          <h1 className='text-center text-sm text-zinc-400'>COD</h1></div>
      </div>
   ))}
 </div>
</div>

)}

   </ div>
  )
}
