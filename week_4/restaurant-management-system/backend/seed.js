// const mongoose = require('mongoose');
// const Restaurant = require('./models/Restaurant');
// const MenuItem = require('./models/MenuItem');
// const Review = require('./models/Review');
// require('dotenv').config();

// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_db';

// const restaurants = [
//   {
//     name: "The Golden Plate",
//     description: "Experience culinary excellence at The Golden Plate, where classic American cuisine meets modern gastronomy. Our farm-to-table approach ensures every dish bursts with freshness and flavor.",
//     location: "Manhattan, New York",
//     address: "142 West 57th Street, Manhattan, New York, NY 10019",
//     phone: "+1 (212) 555-0192",
//     email: "info@goldenplate.com",
//     image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
//     cuisine_type: "American",
//     opening_time: "11:00 AM",
//     closing_time: "11:00 PM",
//     price_range: "$$$",
//     average_rating: 4.7,
//     total_reviews: 0,
//     features: ["Outdoor Seating", "Private Dining", "Bar", "Valet Parking"]
//   },
//   {
//     name: "Sakura Garden",
//     description: "Authentic Japanese cuisine in a serene Zen atmosphere. Our master chefs trained in Tokyo bring you traditional recipes with the freshest ingredients imported weekly from Japan.",
//     location: "Downtown Los Angeles",
//     address: "380 South Grand Avenue, Los Angeles, CA 90071",
//     phone: "+1 (213) 555-0148",
//     email: "hello@sakuragarden.com",
//     image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
//     cuisine_type: "Japanese",
//     opening_time: "12:00 PM",
//     closing_time: "10:30 PM",
//     price_range: "$$$$",
//     average_rating: 4.9,
//     total_reviews: 0,
//     features: ["Sake Bar", "Sushi Counter", "Private Rooms", "Reservations Required"]
//   },
//   {
//     name: "Casa Mexicana",
//     description: "Vibrant colors, bold flavors, and festive atmosphere await you at Casa Mexicana. Serving authentic regional Mexican cuisine with handcrafted cocktails and an extensive tequila selection.",
//     location: "River North, Chicago",
//     address: "500 North Clark Street, Chicago, IL 60654",
//     phone: "+1 (312) 555-0167",
//     email: "viva@casamexicana.com",
//     image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80",
//     cuisine_type: "Mexican",
//     opening_time: "11:30 AM",
//     closing_time: "12:00 AM",
//     price_range: "$$",
//     average_rating: 4.5,
//     total_reviews: 0,
//     features: ["Rooftop Bar", "Live Music", "Happy Hour", "Catering Available"]
//   },
//   {
//     name: "La Bella Italia",
//     description: "Step into the heart of Tuscany without leaving the city. La Bella Italia serves handmade pastas, wood-fired pizzas, and an exceptional wine collection curated from Italy's finest vineyards.",
//     location: "North End, Boston",
//     address: "234 Hanover Street, Boston, MA 02113",
//     phone: "+1 (617) 555-0134",
//     email: "ciao@labellaitalia.com",
//     image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
//     cuisine_type: "Italian",
//     opening_time: "12:00 PM",
//     closing_time: "10:00 PM",
//     price_range: "$$$",
//     average_rating: 4.6,
//     total_reviews: 0,
//     features: ["Wine Cellar", "Terrace", "Gluten-Free Options", "Sommelier On-Site"]
//   },
//   {
//     name: "The Spice Route",
//     description: "Embark on a culinary journey through India's diverse regions. From Punjabi tandoori to Kerala seafood, The Spice Route offers an unparalleled authentic Indian dining experience.",
//     location: "Bellevue, Seattle",
//     address: "1200 112th Avenue NE, Bellevue, WA 98004",
//     phone: "+1 (425) 555-0189",
//     email: "namaste@spiceroute.com",
//     image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
//     cuisine_type: "Indian",
//     opening_time: "11:00 AM",
//     closing_time: "10:30 PM",
//     price_range: "$$",
//     average_rating: 4.4,
//     total_reviews: 0,
//     features: ["Vegetarian Friendly", "Vegan Options", "Catering", "Sunday Buffet"]
//   },
//   {
//     name: "Le Petit Bistro",
//     description: "A slice of Paris in the heart of the city. Le Petit Bistro delivers classic French cuisine with contemporary flair, featuring daily specials inspired by market-fresh seasonal ingredients.",
//     location: "Midtown, Atlanta",
//     address: "811 Juniper Street NE, Atlanta, GA 30308",
//     phone: "+1 (404) 555-0156",
//     email: "bonjour@lepetitbistro.com",
//     image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
//     cuisine_type: "French",
//     opening_time: "11:30 AM",
//     closing_time: "10:00 PM",
//     price_range: "$$$",
//     average_rating: 4.8,
//     total_reviews: 0,
//     features: ["Patio Dining", "Weekend Brunch", "Cheese Selection", "Chef's Table"]
//   }
// ];

// const menuItemsData = {
//   "The Golden Plate": [
//     { item_name: "Prime Ribeye Steak", description: "12oz USDA Prime ribeye with truffle butter and roasted garlic", price: 52, category: "Main Course", is_available: true },
//     { item_name: "Lobster Bisque", description: "Rich, creamy bisque with Maine lobster and chive oil", price: 18, category: "Soup", is_available: true },
//     { item_name: "Caesar Salad", description: "Classic romaine, house dressing, parmesan, anchovy croutons", price: 14, category: "Salad", is_available: true },
//     { item_name: "Truffle Fries", description: "Crispy hand-cut fries with truffle oil and parmesan", price: 12, category: "Sides", is_available: true },
//     { item_name: "New York Cheesecake", description: "House-made with berry compote and whipped cream", price: 14, category: "Dessert", is_available: true },
//     { item_name: "Craft Old Fashioned", description: "Buffalo Trace bourbon, house bitters, orange zest", price: 16, category: "Beverage", is_available: true },
//     { item_name: "Shrimp Cocktail", description: "Jumbo gulf shrimp, classic cocktail sauce, lemon", price: 22, category: "Appetizer", is_available: true },
//     { item_name: "Pan-Seared Salmon", description: "Atlantic salmon, lemon caper butter, seasonal vegetables", price: 38, category: "Main Course", is_available: true },
//   ],
//   "Sakura Garden": [
//     { item_name: "Omakase Sushi Set (12pc)", description: "Chef's selection of seasonal nigiri and premium rolls", price: 85, category: "Special", is_available: true },
//     { item_name: "Wagyu Beef Ramen", description: "Rich tonkotsu broth, A5 wagyu slices, ajitsuke tamago", price: 42, category: "Main Course", is_available: true },
//     { item_name: "Edamame", description: "Steamed and salted, fresh from Japan", price: 8, category: "Appetizer", is_available: true, is_vegetarian: true, is_vegan: true },
//     { item_name: "Miso Soup", description: "House dashi, silken tofu, wakame, green onion", price: 6, category: "Soup", is_available: true, is_vegetarian: true },
//     { item_name: "Matcha Tiramisu", description: "Japanese twist on the classic, ceremonial matcha", price: 16, category: "Dessert", is_available: true, is_vegetarian: true },
//     { item_name: "Premium Sake Flight", description: "Three curated sakes from different regions of Japan", price: 28, category: "Beverage", is_available: true },
//     { item_name: "Dragon Roll", description: "Shrimp tempura, cucumber, topped with avocado, eel sauce", price: 24, category: "Appetizer", is_available: true },
//     { item_name: "Tempura Udon", description: "Handmade udon noodles, prawn and vegetable tempura", price: 32, category: "Main Course", is_available: true },
//   ],
//   "Casa Mexicana": [
//     { item_name: "Street Tacos (3pc)", description: "Corn tortillas, carne asada, onion, cilantro, salsa verde", price: 18, category: "Main Course", is_available: true },
//     { item_name: "Guacamole & Chips", description: "Table-side preparation, fresh Hass avocados, pico de gallo", price: 14, category: "Appetizer", is_available: true, is_vegetarian: true, is_vegan: true },
//     { item_name: "Chicken Enchiladas", description: "Two enchiladas, mole negro, crema, queso fresco", price: 22, category: "Main Course", is_available: true },
//     { item_name: "Tortilla Soup", description: "Traditional chicken broth, fried tortilla strips, avocado", price: 12, category: "Soup", is_available: true },
//     { item_name: "Churros", description: "Cinnamon sugar, dark chocolate dipping sauce", price: 10, category: "Dessert", is_available: true, is_vegetarian: true },
//     { item_name: "Classic Margarita", description: "Patron Silver, fresh lime, agave, salt rim", price: 15, category: "Beverage", is_available: true },
//     { item_name: "Elote Salad", description: "Mexican street corn, cotija, chipotle mayo, lime", price: 11, category: "Salad", is_available: true, is_vegetarian: true },
//     { item_name: "Carnitas Bowl", description: "Slow-cooked pork, cilantro lime rice, black beans, pico", price: 24, category: "Main Course", is_available: true },
//   ],
// };

// const reviewsData = [
//   { user_name: "Sarah M.", rating: 5, comment: "Absolutely spectacular dining experience! The food was impeccably prepared and the service was world-class. Can't wait to return!", visit_type: "Dine-in" },
//   { user_name: "James R.", rating: 4, comment: "Really excellent food and a great atmosphere. The steak was cooked to perfection. Slightly pricey but worth every penny for a special occasion.", visit_type: "Dine-in" },
//   { user_name: "Emily K.", rating: 5, comment: "One of the best meals I've ever had. The chef clearly has a passion for their craft. The desserts alone are worth the trip!", visit_type: "Dine-in" },
//   { user_name: "Michael T.", rating: 4, comment: "Great food, lovely ambiance. Service was a little slow on a busy Friday night but the quality made up for it. Highly recommend the special.", visit_type: "Dine-in" },
//   { user_name: "Jessica L.", rating: 5, comment: "We celebrated our anniversary here and it was magical. The staff made it so special. The tasting menu was unforgettable.", visit_type: "Dine-in" },
//   { user_name: "David H.", rating: 3, comment: "Decent food but didn't quite live up to the hype for me. Maybe caught them on an off night. The cocktails were excellent though.", visit_type: "Dine-in" },
// ];

// async function seed() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log(' Connected to MongoDB');

//     // Clear existing data
//     await Restaurant.deleteMany({});
//     await MenuItem.deleteMany({});
//     await Review.deleteMany({});
//     console.log(' Cleared existing data');

//     // Insert restaurants
//     const createdRestaurants = await Restaurant.insertMany(restaurants);
//     console.log(` Created ${createdRestaurants.length} restaurants`);

//     // Insert menu items
//     let menuCount = 0;
//     for (const restaurant of createdRestaurants) {
//       const items = menuItemsData[restaurant.name] || menuItemsData["The Golden Plate"];
//       const menuItems = items.map(item => ({ ...item, restaurant_id: restaurant._id }));
//       await MenuItem.insertMany(menuItems);
//       menuCount += menuItems.length;
//     }
//     console.log(` Created ${menuCount} menu items`);

//     // Insert reviews and update ratings
//     let reviewCount = 0;
//     for (const restaurant of createdRestaurants) {
//       const numReviews = Math.floor(Math.random() * 3) + 3;
//       const shuffled = [...reviewsData].sort(() => 0.5 - Math.random());
//       const selectedReviews = shuffled.slice(0, numReviews).map(r => ({
//         ...r,
//         restaurant_id: restaurant._id,
//         date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000)
//       }));
//       await Review.insertMany(selectedReviews);
      
//       const avgRating = selectedReviews.reduce((sum, r) => sum + r.rating, 0) / selectedReviews.length;
//       await Restaurant.findByIdAndUpdate(restaurant._id, {
//         average_rating: Math.round(avgRating * 10) / 10,
//         total_reviews: selectedReviews.length
//       });
//       reviewCount += selectedReviews.length;
//     }
//     console.log(`Created ${reviewCount} reviews`);

//     console.log('\n Database seeded successfully!');
//     console.log(' Summary:');
//     console.log(`   - ${createdRestaurants.length} restaurants`);
//     console.log(`   - ${menuCount} menu items`);
//     console.log(`   - ${reviewCount} reviews`);
//     process.exit(0);
//   } catch (error) {
//     console.error('Seeding error:', error);
//     process.exit(1);
//   }
// }

// seed();






//hello
const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");
const MenuItem = require("./models/MenuItem");
const Review = require("./models/Review");
require("dotenv").config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/restaurant_db";


// ---------------- RESTAURANTS ----------------

const restaurants = [
{
name: "SukhSagar Restaurant",
description: "Popular vegetarian restaurant in Shegaon known for delicious Maharashtrian and North Indian food.",
location: "Shegaon, Maharashtra",
address: "Main Road, Shegaon 444203",
phone: "+91 9876543210",
email: "sukhsagar@gmail.com",
image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
cuisine_type: "Indian",
opening_time: "09:00 AM",
closing_time: "10:30 PM",
price_range: "₹₹",
average_rating: 4.4,
total_reviews: 0,
features: ["Family Dining","Takeaway","Vegetarian"]
},
{
name: "Hotel Nandan",
description: "Well known family restaurant serving Indian and Chinese cuisine in Shegaon.",
location: "Shegaon, Maharashtra",
address: "Near Bus Stand, Shegaon",
phone: "+91 9876543211",
email: "nandan@gmail.com",
image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
cuisine_type: "Indian",
opening_time: "10:00 AM",
closing_time: "11:00 PM",
price_range: "₹₹",
average_rating: 4.2,
total_reviews: 0,
features: ["AC Hall","Family Dining","Parking"]
},
{
name: "Gayatri Restaurant",
description: "Famous local restaurant offering traditional Indian dishes and snacks.",
location: "Shegaon, Maharashtra",
address: "Khamgaon Road, Shegaon",
phone: "+91 9876543212",
email: "gayatri@gmail.com",
image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
cuisine_type: "Indian",
opening_time: "08:30 AM",
closing_time: "10:00 PM",
price_range: "₹",
average_rating: 4.1,
total_reviews: 0,
features: ["Pure Veg","Fast Service","Takeaway"]
}
];



const menuItemsData = {

"SukhSagar Restaurant":[
{ item_name:"Paneer Butter Masala",description:"Soft paneer cubes cooked in rich tomato butter gravy",price:220,category:"Main Course",is_available:true },
{ item_name:"Veg Biryani",description:"Fragrant basmati rice cooked with vegetables and spices",price:180,category:"Main Course",is_available:true },
{ item_name:"Masala Dosa",description:"Crispy dosa stuffed with spicy potato filling",price:120,category:"Breakfast",is_available:true },
{ item_name:"Tomato Soup",description:"Hot and creamy tomato soup",price:90,category:"Soup",is_available:true },
{ item_name:"Gulab Jamun",description:"Soft milk dumplings in sugar syrup",price:80,category:"Dessert",is_available:true },
{ item_name:"Fresh Lime Soda",description:"Refreshing lime drink with soda",price:60,category:"Beverage",is_available:true }
],

"Hotel Nandan":[
{ item_name:"Butter Chicken",description:"Tender chicken cooked in creamy tomato gravy",price:260,category:"Main Course",is_available:true },
{ item_name:"Chicken Biryani",description:"Hyderabadi style spicy chicken biryani",price:240,category:"Main Course",is_available:true },
{ item_name:"Veg Manchurian",description:"Fried vegetable balls tossed in Chinese sauce",price:160,category:"Starter",is_available:true },
{ item_name:"Hakka Noodles",description:"Stir fried noodles with vegetables",price:150,category:"Main Course",is_available:true },
{ item_name:"Ice Cream",description:"Vanilla ice cream scoop",price:70,category:"Dessert",is_available:true },
{ item_name:"Cold Coffee",description:"Chilled coffee with ice cream",price:110,category:"Beverage",is_available:true }
],

"Gayatri Restaurant":[
{ item_name:"Maharashtrian Thali",description:"Complete thali with chapati, bhaji, dal, rice",price:180,category:"Main Course",is_available:true },
{ item_name:"Poha",description:"Traditional Maharashtrian breakfast poha",price:50,category:"Breakfast",is_available:true },
{ item_name:"Sabudana Khichdi",description:"Sago cooked with peanuts and spices",price:80,category:"Breakfast",is_available:true },
{ item_name:"Misal Pav",description:"Spicy misal served with pav bread",price:90,category:"Main Course",is_available:true },
{ item_name:"Shrikhand",description:"Sweet yogurt dessert",price:70,category:"Dessert",is_available:true },
{ item_name:"Tea",description:"Hot Indian masala chai",price:20,category:"Beverage",is_available:true }
]

};



const reviewsData = [
{ user_name:"Rahul P.",rating:5,comment:"Amazing food and great service!",visit_type:"Dine-in"},
{ user_name:"Sneha K.",rating:4,comment:"Nice place for family dinner.",visit_type:"Dine-in"},
{ user_name:"Amit S.",rating:5,comment:"Loved the biryani and desserts.",visit_type:"Dine-in"},
{ user_name:"Priya M.",rating:4,comment:"Very good vegetarian food.",visit_type:"Dine-in"},
{ user_name:"Vikas R.",rating:3,comment:"Food was good but service slow.",visit_type:"Dine-in"}
];




async function seed(){

try{

await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB");

// clear database

await Restaurant.deleteMany({});
await MenuItem.deleteMany({});
await Review.deleteMany({});
console.log("Cleared existing data");


// insert restaurants

const createdRestaurants = await Restaurant.insertMany(restaurants);
console.log(`Created ${createdRestaurants.length} restaurants`);


// insert menu

let menuCount = 0;

for(const restaurant of createdRestaurants){

const items = menuItemsData[restaurant.name];

const menuItems = items.map(item=>({
...item,
restaurant_id: restaurant._id
}));

await MenuItem.insertMany(menuItems);

menuCount += menuItems.length;

}

console.log(`Created ${menuCount} menu items`);


// insert reviews

let reviewCount = 0;

for(const restaurant of createdRestaurants){

const selectedReviews = reviewsData.map(r=>({
...r,
restaurant_id: restaurant._id
}));

await Review.insertMany(selectedReviews);

reviewCount += selectedReviews.length;

}

console.log(`Created ${reviewCount} reviews`);

console.log("\nDatabase Seeded Successfully");

process.exit();

}

catch(error){

console.error("Seeding Error:",error);
process.exit(1);

}

}

seed();


