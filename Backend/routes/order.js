const router=require("express").Router()
const User=require("../models/user")
const {authenticateToken}=require("./userAuth")
const Book=require("../models/book")
const Order=require("../models/order")
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// place order
router.post("/place-order",authenticateToken,async (req,res)=>{
    try {
        const{id}=req.headers
        const {order}=req.body
       
        for(const orderData of order){
            const newOrder=new Order({user:id,book:orderData._id})
            const orderDataFromDb=await newOrder.save()
        // saving order in user model
            await User.findByIdAndUpdate(id,{
                $push:{orders: orderDataFromDb._id}
            })
        // clearing cart
        await User.findByIdAndUpdate(id,{
            $pull:{cart:orderData._id}
        })

        }
        return res.json({
            status:"Success",
            message:"Order Placed Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occured"})
    }
})


// get order history of particular 
router.get("/get-order-history",authenticateToken,async (req,res)=>{ 
    try {
        const {id}=req.headers
        const userData=await User.findById(id).populate({
       path:"orders",
       populate:{path:"book"}
   
        })

        const ordersData=userData.orders.reverse()
        return res.json({
            status:"Success",
            data:ordersData
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occurred"})
    }
})

// get all orders ---admin
router.get("/get-all-orders",authenticateToken,async (req,res)=>{
    try {
        const userData=await Order.find()
        .populate({
            path:"book"
        })
        .populate({
            path:"user"
        })
        .sort({createdAt:-1})
        return res.json({
            status:"Success",
            data:userData

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occurred"})
    }
})

// update order admin
router.put("/update-status/:id",authenticateToken,async (req,res)=>{
    try {
       const {id}=req.params
       await Order.findByIdAndUpdate(id,{status: req.body.status})
       return res.json({
        status:"Success",
        message:"Status Updated Successfully"
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"An error occurred"})
    }
})

// Create Razorpay order
router.post('/create-razorpay-order', authenticateToken, async (req, res) => {
    try {
        const { amount } = req.body; // amount in INR
        const options = {
            amount: amount * 100, // amount in paise
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`
        };
        const order = await razorpay.orders.create(options);
        res.json({
            status: 'Success',
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create Razorpay order' });
    }
});

// Verify Razorpay payment
router.post('/verify-razorpay-payment', authenticateToken, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest('hex');
        if (expectedSignature === razorpay_signature) {
            return res.json({ status: 'Success', message: 'Payment verified successfully' });
        } else {
            return res.status(400).json({ status: 'Failure', message: 'Invalid signature' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Payment verification failed' });
    }
});

module.exports=router