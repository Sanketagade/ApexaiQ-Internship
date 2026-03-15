const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const restaurantRoutes = require("./routes/restaurants")

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/restaurants")
.then(()=>console.log("MongoDB Connected"))

app.use("/restaurants", restaurantRoutes)

app.listen(3000,()=>{
console.log("Server running on port 3000")
})