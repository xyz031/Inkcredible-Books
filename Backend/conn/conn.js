const mongoose=require("mongoose")

const conn=async()=>{
    try {
        await mongoose.connect(`${process.env.URL}`)
        console.log("Connected")
    } catch (e) {
        console.log(e)
    }
}

conn();