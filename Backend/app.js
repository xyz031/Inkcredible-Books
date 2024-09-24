const express =require("express")
const app=express()
const port = process.env.PORT || 4000;

const cors=require("cors")
require("dotenv").config()
require("./conn/conn")
const Books=require("./routes/book")
const User=require("./routes/userRoute")
const Favourites=require("./routes/favourite")
const Cart=require("./routes/cart")
const Order=require("./routes/order")


app.use(cors())
app.use(express.json());

// routes
app.use("/api/v1",User)
app.use("/api/v1",Books)
app.use("/api/v1",Favourites)
app.use("/api/v1",Cart)
app.use("/api/v1",Order)
// creating Port

app.listen(process.env.PORT,()=>{
    console.log(`server ${process.env.PORT}`)
}) 