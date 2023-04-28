const mongoose=require("mongoose")
const eventBooking=mongoose.Schema({
    status:{
        default:'Active',
        type:String
    },
    name:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"productmodel"
    },
    date:{
        type:Date,
        default:new Date()
    },
    noOfProducts:{
        type:Number
    },
    juicies:{
        type:Number
    },
    smoothies:{
        type:Number
    },
    totalAmount:{
        type:Number
    }
    
})
module.exports=mongoose.model("userBooking",eventBooking)