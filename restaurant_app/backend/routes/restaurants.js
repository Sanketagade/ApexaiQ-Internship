const express = require("express")
const router = express.Router()

const Restaurant = require("../models/Restaurant")

router.get("/", async(req,res)=>{

const data = await Restaurant.find()

res.json(data)

})

router.post("/", async(req,res)=>{

const restaurant = new Restaurant(req.body)

await restaurant.save()

res.json(restaurant)

})

module.exports = router