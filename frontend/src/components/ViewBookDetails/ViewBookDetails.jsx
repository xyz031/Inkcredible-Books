import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { IoLanguageSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function ViewBookDetails() {

    const {id}=  useParams()  
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const role=useSelector((state)=>state.auth.role)

    const [Data,setData]=useState()
    useEffect(() => {
      const fetch=async()=>{
        const response=await axios.get(`https://inkcredible-books.onrender.com/api/v1/get-books-by-id/${id}`)
        setData(response.data.data)
        
      }
      fetch()
    }, [])


    const headers = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`, 
      'bookid':id, 
      'id':localStorage.getItem("id")
    };
  
   

    const handleFavourite=async () => {
      const response=await axios.put("https://inkcredible-books.onrender.com/api/v1/add-book-to-favourite",{},{headers})
      alert(response.data.message)
    }

    const handleCart=async()=>{
      const response=await axios.put("https://inkcredible-books.onrender.com/api/v1/add-to-cart",{},{headers})
      alert(response.data.message)
    }

    const deleteBook = async (bookId) => {
   
      try {
        const response = await axios.delete("http://localhost:1000/api/v1/delete-book", { headers });
        const val = response.data;
        console.log(val);
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
      }
    };

  return (
    <>

    {Data &&   <div className='px-4 min-h-screen md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>


<div className=' w-full lg:w-3/6 '>
{" "}
<div className='flex justify-around bg-zinc-800 p-12 rounded'>
  {" "}


<img src={Data.url} alt='/' className='h-[50vh] lg:h-[70vh] rounded object-cover'></img>
{" "}

  {isLoggedIn===true && role==="user" && ( <div className='flex flex-col '> 
    <button onClick={handleFavourite} className='bg-white rounded-full  text-red-500  text-3xl p-3'><FaHeart /></button>
  <button onClick={handleCart} className='bg-white rounded-full  text-blue-500  text-3xl p-3 mt-8'><FaShoppingCart /></button>
  </div>)}
  {isLoggedIn===true && role==="admin" && ( <div className='flex flex-col '> 
    <button onClick={handleFavourite} className='bg-white rounded-full   text-3xl p-3'><FaEdit /></button>
  <button onClick={deleteBook} className='bg-white rounded-full  text-red-500  text-3xl p-3 mt-8'><MdDelete />
  </button>
  </div>)}

</div>
</div>
<div className='p-4 w-3/6'>
<h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
<p className=' text-zinc-500 mt-4 text-xl'>{Data.author}</p>
<p className=' text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
<p className='flex items-center justify-start text-zinc-400 mt-4 '><IoLanguageSharp className='me-3'/> {Data.language}</p>
<p className=' text-xl text-zinc-200 font-semibold'>₹{Data.price}</p>
</div>
</div>}
        {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center '><Loader/></div>}
  
    </>
  )
}
