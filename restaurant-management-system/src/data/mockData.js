export const MOCK_RESTAURANTS = [
  {
    _id: '1',
    name: 'The Golden Plate',
    description: 'Experience culinary excellence at The Golden Plate, where classic American cuisine meets modern gastronomy. Our farm-to-table approach ensures every dish bursts with freshness and flavor.',
    location: 'Manhattan, New York',
    address: '142 West 57th Street, Manhattan, New York, NY 10019',
    phone: '+1 (212) 555-0192',
    email: 'info@goldenplate.com',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    cuisine_type: 'American',
    opening_time: '11:00 AM',
    closing_time: '11:00 PM',
    price_range: '$$$',
    average_rating: 4.7,
    total_reviews: 124,
    features: ['Outdoor Seating', 'Private Dining', 'Bar', 'Valet Parking']
  },
  {
    _id: '2',
    name: 'Sakura Garden',
    description: 'Authentic Japanese cuisine in a serene Zen atmosphere. Our master chefs trained in Tokyo bring you traditional recipes with the freshest ingredients imported weekly from Japan.',
    location: 'Downtown Los Angeles',
    address: '380 South Grand Avenue, Los Angeles, CA 90071',
    phone: '+1 (213) 555-0148',
    email: 'hello@sakuragarden.com',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    cuisine_type: 'Japanese',
    opening_time: '12:00 PM',
    closing_time: '10:30 PM',
    price_range: '$$$$',
    average_rating: 4.9,
    total_reviews: 89,
    features: ['Sake Bar', 'Sushi Counter', 'Private Rooms', 'Reservations Required']
  },
  {
    _id: '3',
    name: 'Casa Mexicana',
    description: 'Vibrant colors, bold flavors, and festive atmosphere await you at Casa Mexicana. Serving authentic regional Mexican cuisine with handcrafted cocktails and an extensive tequila selection.',
    location: 'River North, Chicago',
    address: '500 North Clark Street, Chicago, IL 60654',
    phone: '+1 (312) 555-0167',
    email: 'viva@casamexicana.com',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
    cuisine_type: 'Mexican',
    opening_time: '11:30 AM',
    closing_time: '12:00 AM',
    price_range: '$$',
    average_rating: 4.5,
    total_reviews: 201,
    features: ['Rooftop Bar', 'Live Music', 'Happy Hour', 'Catering Available']
  },
  {
    _id: '4',
    name: 'La Bella Italia',
    description: 'Step into the heart of Tuscany without leaving the city. La Bella Italia serves handmade pastas, wood-fired pizzas, and an exceptional wine collection curated from Italy\'s finest vineyards.',
    location: 'North End, Boston',
    address: '234 Hanover Street, Boston, MA 02113',
    phone: '+1 (617) 555-0134',
    email: 'ciao@labellaitalia.com',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    cuisine_type: 'Italian',
    opening_time: '12:00 PM',
    closing_time: '10:00 PM',
    price_range: '$$$',
    average_rating: 4.6,
    total_reviews: 156,
    features: ['Wine Cellar', 'Terrace', 'Gluten-Free Options', 'Sommelier On-Site']
  },
  {
    _id: '5',
    name: 'The Spice Route',
    description: 'Embark on a culinary journey through India\'s diverse regions. From Punjabi tandoori to Kerala seafood, The Spice Route offers an unparalleled authentic Indian dining experience.',
    location: 'Bellevue, Seattle',
    address: '1200 112th Avenue NE, Bellevue, WA 98004',
    phone: '+1 (425) 555-0189',
    email: 'namaste@spiceroute.com',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
    cuisine_type: 'Indian',
    opening_time: '11:00 AM',
    closing_time: '10:30 PM',
    price_range: '$$',
    average_rating: 4.4,
    total_reviews: 178,
    features: ['Vegetarian Friendly', 'Vegan Options', 'Catering', 'Sunday Buffet']
  },
  {
    _id: '6',
    name: 'Le Petit Bistro',
    description: 'A slice of Paris in the heart of the city. Le Petit Bistro delivers classic French cuisine with contemporary flair, featuring daily specials inspired by market-fresh seasonal ingredients.',
    location: 'Midtown, Atlanta',
    address: '811 Juniper Street NE, Atlanta, GA 30308',
    phone: '+1 (404) 555-0156',
    email: 'bonjour@lepetitbistro.com',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    cuisine_type: 'French',
    opening_time: '11:30 AM',
    closing_time: '10:00 PM',
    price_range: '$$$',
    average_rating: 4.8,
    total_reviews: 93,
    features: ['Patio Dining', 'Weekend Brunch', 'Cheese Selection', "Chef's Table"]
  }
]

const MENUS = {
  default: {
    'Appetizer': [
      { _id: 'm1', item_name: 'Shrimp Cocktail', description: 'Jumbo gulf shrimp, cocktail sauce, lemon', price: 22, category: 'Appetizer', is_available: true },
      { _id: 'm2', item_name: 'Bruschetta', description: 'Grilled sourdough, heirloom tomato, basil', price: 14, category: 'Appetizer', is_available: true, is_vegetarian: true }
    ],
    'Soup': [
      { _id: 'm3', item_name: 'Lobster Bisque', description: 'Rich creamy bisque with Maine lobster and chive oil', price: 18, category: 'Soup', is_available: true }
    ],
    'Salad': [
      { _id: 'm4', item_name: 'Caesar Salad', description: 'Classic romaine, house dressing, parmesan, croutons', price: 14, category: 'Salad', is_available: true, is_vegetarian: true }
    ],
    'Main Course': [
      { _id: 'm5', item_name: 'Prime Ribeye Steak', description: '12oz USDA Prime ribeye with truffle butter and roasted garlic', price: 52, category: 'Main Course', is_available: true },
      { _id: 'm6', item_name: 'Pan-Seared Salmon', description: 'Atlantic salmon, lemon caper butter, seasonal vegetables', price: 38, category: 'Main Course', is_available: true },
      { _id: 'm7', item_name: 'Mushroom Risotto', description: 'Arborio rice, wild mushrooms, truffle oil, parmesan', price: 28, category: 'Main Course', is_available: true, is_vegetarian: true }
    ],
    'Sides': [
      { _id: 'm8', item_name: 'Truffle Fries', description: 'Crispy hand-cut fries with truffle oil and parmesan', price: 12, category: 'Sides', is_available: true, is_vegetarian: true },
      { _id: 'm9', item_name: 'Roasted Asparagus', description: 'Lemon zest, sea salt, olive oil', price: 10, category: 'Sides', is_available: false, is_vegetarian: true, is_vegan: true }
    ],
    'Dessert': [
      { _id: 'm10', item_name: 'New York Cheesecake', description: 'House-made with berry compote and whipped cream', price: 14, category: 'Dessert', is_available: true, is_vegetarian: true },
      { _id: 'm11', item_name: 'Chocolate Lava Cake', description: 'Warm chocolate cake, vanilla bean ice cream', price: 16, category: 'Dessert', is_available: true, is_vegetarian: true }
    ],
    'Beverage': [
      { _id: 'm12', item_name: 'Craft Old Fashioned', description: 'Buffalo Trace bourbon, house bitters, orange zest', price: 16, category: 'Beverage', is_available: true },
      { _id: 'm13', item_name: 'Fresh Lemonade', description: 'Hand-squeezed lemons, lavender syrup, sparkling water', price: 8, category: 'Beverage', is_available: true, is_vegan: true }
    ]
  }
}

export function getMockMenu(restaurantId) {
  const grouped = MENUS[restaurantId] || MENUS.default
  const items = Object.values(grouped).flat()
  return { grouped, items }
}

export const MOCK_REVIEWS = [
  {
    _id: 'r1', user_name: 'Sarah M.', rating: 5,
    comment: 'Absolutely spectacular dining experience! The food was impeccably prepared and the service was world-class. Will definitely be back.',
    visit_type: 'Dine-in', date: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    _id: 'r2', user_name: 'James R.', rating: 4,
    comment: 'Really excellent food and great atmosphere. The steak was cooked to perfection. Slightly pricey but worth it for a special occasion.',
    visit_type: 'Dine-in', date: new Date(Date.now() - 12 * 86400000).toISOString()
  },
  {
    _id: 'r3', user_name: 'Emily K.', rating: 5,
    comment: 'One of the best meals I\'ve ever had. The chef clearly has a passion for their craft. The desserts alone are worth the trip!',
    visit_type: 'Dine-in', date: new Date(Date.now() - 18 * 86400000).toISOString()
  },
  {
    _id: 'r4', user_name: 'Michael T.', rating: 3,
    comment: 'Decent food but didn\'t quite live up to the hype. Maybe caught them on an off night. The cocktails were excellent though.',
    visit_type: 'Takeout', date: new Date(Date.now() - 25 * 86400000).toISOString()
  }
]
