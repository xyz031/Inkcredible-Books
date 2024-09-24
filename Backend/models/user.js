const mongoose=require("mongoose")

const user=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,

    },
    avatar:{
        type:String,
        default:"https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    },
    favourites:[{type:mongoose.Types.ObjectId,
        ref:"books",
    }],
    cart:[{type:mongoose.Types.ObjectId,
        ref:"books",
    }],
    orders:[{type:mongoose.Types.ObjectId,
        ref:"order",
    }]

},
{timestamps:true}
)

module.exports=mongoose.model("user",user)