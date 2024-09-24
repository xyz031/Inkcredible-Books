const router=require("express").Router()
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")

// put book to cart
router.put("/add-to-cart",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers 
        const userData=await User.findById(id)
       const isBookFavourite=userData.cart.includes(bookid)
       if(isBookFavourite)
       {
        return res.json({
            status:"Success",message:"Book is already in cart"
        })
       }
      await User.findByIdAndUpdate(id,{$push:{cart:bookid}})
       return res.json({status:"Success",message:"Book is added to cart"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})

// remove from cart
router.put("/remove-from-cart/:bookid",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.params
        const {id}=req.headers
        await User.findByIdAndUpdate(id,{
          
                $pull:{cart:bookid}
            })
     

      
        return res.json({
            status:"Success",message:"Book is removed from cart"
        })
       
     
      
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})


// get cart of a particular user

router.get("/get-user-cart",authenticateToken,async(req,res)=>{
    try{
   
        const {id}=req.headers
        const userData=await User.findById(id).populate("cart")
        const cart=userData.cart.reverse();
     

      
        return res.json({
            status:"Success",message:cart
        })
       
     
      
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
})


module.exports=router