import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinesLeaning } from "react-icons/fa6";
import { useSelector} from "react-redux"
import image from "./image/book.png"


export default function Navbar() {

  const links = [
    { title: "Home", link: "/" },
    { title: "All books", link: "/all-books" },
  
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin Profile", link: "/profile" },
  ];

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  const role=useSelector((state)=>state.auth.role)

  
  
  
  if(isLoggedIn===false)
    {
      links.splice(2, 3)
    }
    if(isLoggedIn===true && role==="admin"){
      links.splice(2,2)
    }
    if(isLoggedIn===true && role==="user"){
      links.splice(4,1)
    }
  const [MobileNav,setMobileNav]=useState("hidden")

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-3 py-2 items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-10 me-4"
            src={image}
            alt=""
          />
          <Link to="/" className="text-2xl font-semibold ">
          Inkcredible<span className="text-yellow-100">Books</span>
          </Link>
        </div>
        <div className="nav-links-bookstore block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4 hover:cursor-pointer">
            {links.map((items, i) => (
              <Link to={items.link} className="hover:text-blue-500" key={i}>
                {items.title}{" "}
              </Link>
            ))}
          </div>


          {/* <div className="hidden md:flex gap-4 hover:cursor-pointer">
            {links.map((items,i)=>(
              <div className="flex items-center">
                {items.title==="Profile" || items.title==="Admin Profile" ?(
                  <Link to={items.link} className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-allmduration-300" 
                  key={i}>{items.title}</Link>
                ):(<Link to={items.link} className="hover:text-blue-500 transition-all duration-300"
                 key={i}>{items.title}</Link>)}
              </div>
            ))}
         </div>
         */}




          {isLoggedIn===false && <> <div className="hidden md:flex gap-4">
          <Link
            to="/Login"
            className="px-4 py-1 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Log in
          </Link>
          <Link
            to="/SignUp"
            className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div></>}
          <button  onClick={()=>MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")} className="block md:hidden text-white text-2xl  hover:text-zinc-400">
            < FaLinesLeaning  />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav}  bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, i) => (
          <Link
            to={items.link}
            onClick={()=>MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}
            className="text-white text-4xl font-semibold hover:text-blue-500 mb-5"
            key={i}
          >
            {items.title}{" "}
          </Link>
        ))}
       {isLoggedIn===false && <> <div className="flex gap-4">
          <Link
            to="/Login"
            onClick={()=>MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}
            className="px-4 py-1 text-white border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Log in
          </Link>
          <Link
            to="/SignUp"
            onClick={()=>MobileNav==="hidden"?setMobileNav("block"):setMobileNav("hidden")}
            className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
          >
            Sign Up
          </Link>
        </div></>}
      </div>
    </>
  );
}
