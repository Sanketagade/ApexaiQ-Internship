# 🍽️ TableTop — Restaurant Management System

Full-stack Restaurant Management System with Vue.js 2 + Vuetify frontend and Node.js + Express + MongoDB backend.

---

## 📁 Project Structure

```
restaurant-vue/
│
├── frontend/                          # Vue.js 2 + Vuetify SPA
│   ├── public/
│   │   └── index.html                 # HTML entry
│   ├── src/
│   │   ├── main.js                    # Vue app bootstrap
│   │   ├── App.vue                    # Root component
│   │   ├── plugins/
│   │   │   └── vuetify.js             # Vuetify configuration + theme
│   │   ├── router/
│   │   │   └── index.js               # Vue Router routes
│   │   ├── store/
│   │   │   └── index.js               # Vuex store (state, getters, mutations, actions)
│   │   ├── services/
│   │   │   └── api.js                 # Axios API service layer
│   │   ├── data/
│   │   │   └── mockData.js            # Sample data for demo mode
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppBar.vue         # Navigation bar
│   │   │   │   └── AppFooter.vue      # Footer
│   │   │   ├── shared/
│   │   │   │   ├── GlobalSnackbar.vue # Toast notifications
│   │   │   │   └── StarRating.vue     # Reusable star rating
│   │   │   ├── restaurant/
│   │   │   │   ├── RestaurantCard.vue # Restaurant grid card
│   │   │   │   └── RestaurantFilters.vue # Search/filter bar
│   │   │   ├── menu/
│   │   │   │   └── MenuSection.vue    # Grouped menu display
│   │   │   ├── reviews/
│   │   │   │   ├── ReviewList.vue     # Reviews with rating chart
│   │   │   │   └── AddReviewForm.vue  # Submit review form
│   │   │   └── admin/
│   │   │       ├── AddRestaurantForm.vue
│   │   │       └── AddMenuItemForm.vue
│   │   └── views/
│   │       ├── HomeView.vue           # Restaurant listing page
│   │       ├── RestaurantDetail.vue   # Full restaurant detail page
│   │       └── AdminView.vue          # Admin dashboard
│   ├── package.json
│   ├── vue.config.js
│   └── babel.config.js
│
└── backend/                           # Node.js + Express REST API
    ├── server.js                      # Express entry point
    ├── seed.js                        # Database seeder
    ├── .env.example                   # Environment variables
    ├── package.json
    ├── models/
    │   ├── Restaurant.js              # Restaurant schema
    │   ├── MenuItem.js                # Menu item schema
    │   └── Review.js                  # Review schema
    └── routes/
        ├── restaurants.js             # Restaurant CRUD + search/filter
        ├── menu.js                    # Menu item CRUD
        └── reviews.js                 # Reviews + auto rating update
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB (local install or MongoDB Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set MONGODB_URI

# Seed with 6 restaurants + menus + reviews
npm run seed

# Start dev server (port 5000)
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run serve     # http://localhost:8080
npm run build     # production build
```

> **Demo Mode**: The frontend works **without the backend**. It auto-detects connection failures and falls back to built-in mock data — no setup required to see it running.

---

## 🔌 API Endpoints

### Restaurants
```
GET    /api/restaurants                         List all (supports search, filter, pagination)
GET    /api/restaurants?search=sushi            Text search
GET    /api/restaurants?min_rating=4.5          Filter by rating
GET    /api/restaurants?cuisine=Italian         Filter by cuisine
GET    /api/restaurants?page=1&limit=10         Pagination
GET    /api/restaurants/:id                     Detail + grouped menu
POST   /api/restaurants                         Create (admin)
PUT    /api/restaurants/:id                     Update (admin)
DELETE /api/restaurants/:id                     Soft delete (admin)
```

### Menu
```
GET    /api/menu/:restaurant_id                 Get menu (optionally: ?category=Dessert)
POST   /api/menu                                Add menu item
PUT    /api/menu/:id                            Update item
DELETE /api/menu/:id                            Delete item
```

### Reviews
```
GET    /api/reviews/:restaurant_id              Get reviews (supports ?sort=newest|oldest|highest)
POST   /api/reviews                             Submit review (auto-updates restaurant avg rating)
DELETE /api/reviews/:id                         Delete review
```

---

## 🗃️ MongoDB Schemas

### Restaurant
| Field | Type | Notes |
|-------|------|-------|
| name | String | Required |
| description | String | Required |
| location | String | City/area |
| address | String | Full address |
| cuisine_type | String | American, Italian... |
| opening_time | String | e.g. "11:00 AM" |
| closing_time | String | e.g. "10:00 PM" |
| price_range | String | $, $$, $$$, $$$$ |
| image | String | URL |
| average_rating | Number | Auto-calculated |
| total_reviews | Number | Auto-calculated |
| features | [String] | Tags like "Bar", "Terrace" |

### MenuItem
| Field | Type | Notes |
|-------|------|-------|
| restaurant_id | ObjectId | Ref: Restaurant |
| item_name | String | Required |
| price | Number | Required |
| category | String | Enum: Appetizer, Main Course, Dessert... |
| is_available | Boolean | Default: true |
| is_vegetarian | Boolean | |
| is_vegan | Boolean | |
| is_gluten_free | Boolean | |
| preparation_time | Number | Minutes |

### Review
| Field | Type | Notes |
|-------|------|-------|
| restaurant_id | ObjectId | Ref: Restaurant |
| user_name | String | Required |
| rating | Number | 1–5, required |
| comment | String | Required |
| visit_type | String | Dine-in, Takeout, Delivery |
| date | Date | Auto |

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🏠 Homepage | Restaurant cards with image, rating, hours, cuisine |
| 🔍 Search | Live search by name, location, cuisine |
| 🎛️ Filters | Filter by rating (4.5+, 4.0+, 3.5+) and cuisine type |
| 📋 Grid & List | Toggle between card grid and compact list view |
| 🍽️ Menu | Grouped by category, dietary tags (vegan/vegetarian/GF) |
| ⭐ Reviews | Star rating distribution chart + review cards |
| ✍️ Add Review | Form with name, visit type, star picker, comment |
| 🛡️ Admin Panel | Add restaurants, add menu items, data table view |
| 📱 Responsive | Full Vuetify responsive grid system |
| 🎭 Demo Mode | Auto fallback to mock data if backend unavailable |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Vue.js 2.7 |
| UI Components | Vuetify 2.6 |
| State Management | Vuex 3 |
| Routing | Vue Router 3 |
| HTTP Client | Axios |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Icons | Material Design Icons (MDI) |
