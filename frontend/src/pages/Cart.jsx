import React, { useState ,useEffect} from 'react'
import Loader from '../components/Loader/Loader'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Cart() {

const [Cart,setCart]=useState()
const [Total,setTotal]=useState(0)
const navigate=useNavigate()


const headers={
  id:localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
 

}
useEffect(() => {
  

  const fetch=async()=>{
    const res=await axios.get(
    "http://localhost:1000/api/v1/get-user-cart",{headers})
   
    setCart(res.data.message)
  }
  fetch()
 
}, [Cart])

const deleteItem=async(bookid)=>{
const res=await axios.put(
  `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,{},{headers})
 console.log(response)
}


    useEffect(()=>{
      if(Cart && Cart.length>0)
      {
        let total=0
        Cart.map((items)=>{
          total+=items.price
        })
        setTotal(total)
        total=0
      }
    },[Cart])


    const PlaceOrder =async()=>{
      console.log(Cart)
      try {
        const response=await axios.post(
          `http://localhost:1000/api/v1/place-order`,
          {order:Cart},
          {headers}
        )
        alert(response.data.message)
        navigate("/profile/orderHistory")
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className='bg-zinc-900 px-12 h-auto min-h-screen py-8'>
    {!Cart && <div className='w-full h-screen flex items-center justify-center'> <Loader/></div>}
    {Cart && Cart.length===0 &&(
      <div className="h-screen">
        <div className='h-[100%] flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
            Empty Cart
          </h1>
         
        </div>
      </div>
    )}
    {Cart && Cart.length>0 && (
      <>
      <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>Your Cart</h1>
      {Cart.map((items,i)=>(<div className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center' key={i}>
        <img src={items.url} alt='/' className='h-[20vh] md:h-[10vh] object-cover'/>
        <div className='w-full md:w-auto'>
          <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
            {items.title}
          </h1>
          <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>
            {items.desc.slice(0,100)}...
          </p>
         
        </div>
        <div className='w-full md:w-auto'>
          <h2 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
            ₹ {items.price}
          </h2>
      
        </div>
        <button className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12' onClick={()=>deleteItem(items._id)}>
        <MdDelete />
        </button>
      </div>) )}
      </>
    )}

    {Cart && Cart.length>0 && (
      <div className='mt-4 w-full flex items-center justify-end'>
        <div className='p-4 bg-zinc-800 rounded'>
          <h1 className='text-3xl text-zinc-200 font-semibold'>
            Total Amount
          </h1>
          <div className='mt-3 flex-items-center justify-between text-xl text-zinc-200'>
            <h2>{Cart.length} books</h2><h2>₹ {Total}</h2></div>
            <div className='w-[100%] mt-3'>
            <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full' onClick={PlaceOrder}>
              Place your order
            </button>
              </div>
          </div>
        </div>
    )}
    </div>
  )
}
