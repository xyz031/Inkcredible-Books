import React from 'react'
import {Link } from "react-router-dom"
import axios from 'axios'


export default function BookCard({data, favourite}) {
 
const headers= {
  id:localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
  bookid:data._id
}
const handleRemoveBook=async()=>{
  
  const response=await axios.put(
    "http://localhost:1000/api/v1/delete-book-from-favourite",{},{headers}
  )
}

  return (
   <div className='bg-zinc-800 rounded p-4 flex flex-col'>
   <Link to={`/view-book-details/${data._id}`}>
   <div className='bg-zinc-800 rounded p-4 flex flex-col max-w-60'>
    <div className='bg-zinc-900 flex justify-center'><img className='h-[25vh] rounded flex items-center justify-center' src={data.url} alt="/" /></div>
    <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
    <p className='mt-2 text-zinc-200 font-semibold'>{data.author}</p>
    <p className='mt-2 text-xl text-zinc-200 font-semibold'>₹{data.price}</p>
   </div>
   </Link>
   {favourite && (
     <button className='bg-red-600 rounded  px-4 py-2 border border-white font-semibold' onClick={handleRemoveBook} >Remove from favourite</button>

   )}
   </div>
  )
}
