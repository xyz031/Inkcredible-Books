import React, { useEffect, useState } from 'react'
import axios from "axios"
import BookCard from "../BookCard/BookCard"

export default function Favourites() {

  const [FavouriteBooks,setFavouriteBooks]=useState([])
const headers={
  id: localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
}

useEffect(()=>{
  const fetch=async () => {
    const response =await axios.get(
      "https://inkcredible-books.onrender.com/api/v1/get-favourite-books",{headers}
    )
    setFavouriteBooks(response.data.data)
    
  }
  fetch()
},[FavouriteBooks])

  return (
   <>
    {FavouriteBooks.length===0 && <div className='text-5xl h-[100%] font-semibold text-zinc-600 flex justify-center items-center'>Not Found
    
      </div>}

<div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>

    {FavouriteBooks && FavouriteBooks.map((items,i)=>(
    <div key={i}>
    <BookCard data={items} favourite={true} />
    </div>))}
    </div>
    </>
  )
}
