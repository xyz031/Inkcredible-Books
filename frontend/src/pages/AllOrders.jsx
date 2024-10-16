

import React,{useEffect,useState} from 'react'
import axios from "axios"
 import Loader from '../components/Loader/Loader'
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
 import {Link} from 'react-router-dom'


export default function AllOrders() {


  const [AllOrders,setAllOrders]=useState();
  const [Options, setOptions] = useState(-1)
  const [Values,setValues]=useState({status:""})

const headers={
  
    id:localStorage.getItem("id"),
  authorization:`Bearer ${localStorage.getItem("token")}`
  
}

  useEffect(() => {
    
  const fetch=async()=>{
    const response=await axios.get("https://inkcredible-books.onrender.com/api/v1/get-all-orders",
      {headers})
    setAllOrders(response.data.data)

   }
   fetch()
  }, [AllOrders])

  const change=(e)=>{
    const {value}=e.target;
    setValues({status:value})
  }
  // const setOptionsButton=(i)=>{
  //   setOptions(i)
  // }

  const submitChanges=async(i)=>{
    const id=AllOrders[i]._id;
    const response=await axios.put(`https://inkcredible-books.onrender.com/api/v1/update-status/${id}`,Values,{headers})
    alert(response.data.message)
  }

  AllOrders && AllOrders.splice(AllOrders.length-1,1)
  return (
   <>

    {!AllOrders && <div className='h-[100%] flex items-center justify-center'><Loader/></div>}
   

    {AllOrders && AllOrders.length>0 && <>
    
      <div className='p-0 h-[80vh] md:p-4 text-zinc-100'>
 <div className='[h-100%] flex flex-col items-center'>
   <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
     All Orders
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
            <h1 className="">  <FaRegUser /> 
             </h1>
     </div>
   </div>
   
      {AllOrders.map((items,i)=>
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
            <h1 className='text-center'>₹ {items.book.price}</h1>
          </div>
          <div className='px-3 w-[30%] md:w-[16%]'>
            <h1 className='text-center font-semibold '>
           <button className='hover:scale-105 transition-all duration-300' onClick={()=>setOptions(i)}>
            {items.status==="Order placed" ?(
              <div className='text-yellow-500'>{items.status}</div>)
              :items.status==="Canceled"?(
                <div className='text-red-500'>{items.status}</div>
              ):(
                <div className='text-green-500'>{items.status}</div>
              
            )}
           </button>

      
            <div className={`${Options===i ? "block":"hidden"}`}>
              <select name="status" id="" className='bg-gray-800' onChange={change}>
                {[
                  "Order placed",
                  "Out for delivery",
                  "Delivered",
                  "Canceled"
                ].map((items,i)=>(
                  <option value={items} key={i}>
                    {items}
                  </option>
                ))}
              </select>
              <button className='text-green-500 hover:text-pink-600 mx-2'
              onClick={()=>{
                setOptions(-1);
                submitChanges(i);
              }}
              >
                <FaCheck/>
              </button>
           
            </div>
                
            </h1>
          </div>
          <div className='w-[10%] md:w-[5%] '>
          <button className='text-xl hover:text-orange-500'
          onClick={()=>{
            setuserDiv("fixed");
            setuserDivData(items.user);
          }}
          >
            <FaExternalLinkSquareAlt/>
          </button>
            </div>
        </div>
      )}

 </div>
</div>
    </>}
   </>
  )
}


