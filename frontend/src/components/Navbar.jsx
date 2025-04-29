import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLinesLeaning } from "react-icons/fa6";
import { useSelector } from "react-redux"
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
  const [MobileNav,setMobileNav]=useState(false)

  return (
    <>
      <nav className="z-50 sticky top-0 left-0 w-full bg-zinc-900/95 backdrop-blur-md shadow-md text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-lg shadow-md object-contain bg-white p-1"
            src={image}
            alt="logo"
          />
          <Link to="/" className="text-2xl font-bold tracking-tight flex items-center gap-1">
            Inkcredible<span className="text-yellow-100">Books</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {links.map((items, i) => (
            <Link to={items.link} className="text-lg font-medium hover:text-yellow-200 transition-colors" key={i}>
              {items.title}
            </Link>
          ))}
          {isLoggedIn === false && (
            <>
              <Link
                to="/Login"
                className="px-4 py-1 text-white border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Log in
              </Link>
              <Link
                to="/SignUp"
                className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileNav(!MobileNav)}
            className="text-3xl p-2 rounded hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-yellow-200"
            aria-label="Open menu"
          >
            <FaLinesLeaning />
          </button>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-900/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-300 ${MobileNav ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'}`}
        style={{ minHeight: '100vh' }}
      >
        <button
          onClick={() => setMobileNav(false)}
          className="absolute top-6 right-6 text-3xl text-zinc-400 hover:text-yellow-200 focus:outline-none"
          aria-label="Close menu"
        >
          ×
        </button>
        {links.map((items, i) => (
          <Link
            to={items.link}
            onClick={() => setMobileNav(false)}
            className="text-3xl font-bold text-white hover:text-yellow-200 transition-colors"
            key={i}
          >
            {items.title}
          </Link>
        ))}
        {isLoggedIn===false && (
          <div className="flex flex-col gap-4 mt-8 w-full px-8">
            <Link
              to="/Login"
              onClick={() => setMobileNav(false)}
              className="w-full text-center px-4 py-2 text-white border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Log in
            </Link>
            <Link
              to="/SignUp"
              onClick={() => setMobileNav(false)}
              className="w-full text-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
