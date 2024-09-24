import React,{useEffect} from "react"
import Home from "./pages/Home"
import  Navbar  from "./components/Navbar"
import Footer from "./components/Footer"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import AllBooks from "./pages/AllBooks"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import ViewBookDetails from "./components/ViewBookDetails/ViewBookDetails"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "./store/auth"
import Favourites from "./components/Profile/Favourites"
import UserOrderHistory from "./components/Profile/UserOrderHistory"
import Settings from "./components/Profile/Settings"

export default function App() {

  const dispatch=useDispatch()
  const role=useSelector((state)=>state.auth.role)
useEffect(() => {
  if( localStorage.getItem("id") &&
    localStorage.getItem("token") &&
    localStorage.getItem("role"))
    {
      dispatch(authActions.login())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }


}, [])



  return (
   <div>
   


      <Navbar/>
      <Routes>
    <Route exact path="/" element={ <Home />}/>
    <Route  path="/all-books" element={ <AllBooks/>}/>
    <Route  path="/Login" element={ <Login/>}/>
    <Route  path="/Cart" element={ <Cart/>}/>
    <Route  path="/profile" element={ <Profile/>}>
      <Route index element={<Favourites/>}/>
      <Route path="/profile/orderHistory" element={<UserOrderHistory/>}/>
      <Route path="/profile/settings" element={<Settings/>}/> 
    </Route>
    <Route  path="/SignUp" element={ <SignUp/>}/>
    <Route  path="view-book-details/:id" element={ <ViewBookDetails/>}/>
    </Routes>
    <Footer/>
 
  
   
    
    </div>
  )
}