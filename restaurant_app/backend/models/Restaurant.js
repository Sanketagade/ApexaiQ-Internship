const mongoose = require("mongoose")

const RestaurantSchema = new mongoose.Schema({

name:String,
location:String,
rating:Number,
image:String,
foods:[String]

})

module.exports = mongoose.model("Restaurant",RestaurantSchema)