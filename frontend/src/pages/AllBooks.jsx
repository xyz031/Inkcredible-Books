import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'
export default function AllBooks() {

  const [Data,setData]=useState()
  useEffect(() => {
    const fetch=async()=>{
      const response=await axios.get("http://localhost:1000/api/v1/get-all-books")
      setData(response.data.data)
    }
    fetch()
  }, [])

  return (
    <div className="bg-zinc-900 min-h-screen px-2 md:px-8 py-8">
      <div className="max-w-7xl mx-auto w-full">
        <h4 className="text-4xl md:text-5xl font-bold text-yellow-100 mb-8 text-center tracking-tight drop-shadow-lg">All Books</h4>
        {!Data && <div className="w-full h-[60vh] flex items-center justify-center"><Loader/></div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {Data && Data.map((items,i)=>(<BookCard data={items} key={i}/>))}
        </div>
        {Data && Data.length === 0 && (
          <div className="text-center text-zinc-400 text-2xl mt-16">No books found.</div>
        )}
      </div>
    </div>
  )
}
