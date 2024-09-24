import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinesLeaning } from "react-icons/fa6";
import { useSelector} from "react-redux"



export default function Navbar() {

  const links = [
    { title: "Home", link: "/" },
    { title: "All books", link: "/all-books" },
  
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)

  if(isLoggedIn===false)
  {
    links.splice(2, 2)
  }
  const [MobileNav,setMobileNav]=useState("hidden")

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1725944773~exp=1725948373~hmac=14362c2dbc457361a14ac694f8dc299fda46c2798dff7760537f46aaeda267f6&w=740"
            alt=""
          />
          <Link to="/" className="text-2xl font-semibold">
            Bookstore
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
            className="text-white text-4xl font-semibold hover:text-blue-500 mb-5"
            key={i}
          >
            {items.title}{" "}
          </Link>
        ))}
       {isLoggedIn===false && <> <div className="flex gap-4">
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
      </div>
    </>
  );
}
