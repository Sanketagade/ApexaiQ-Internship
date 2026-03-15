import axios from 'axios'

const BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:5000/api'

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' }
})

// Response interceptor
http.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
)

export default {
  // Restaurants
  getRestaurants(params = {}) {
    return http.get('/restaurants', { params }).then(d => d.data)
  },
  getRestaurantById(id) {
    return http.get(`/restaurants/${id}`).then(d => d.data)
  },
  addRestaurant(data) {
    return http.post('/restaurants', data)
  },
  updateRestaurant(id, data) {
    return http.put(`/restaurants/${id}`, data)
  },
  deleteRestaurant(id) {
    return http.delete(`/restaurants/${id}`)
  },

  // Menu
  getMenu(restaurantId, params = {}) {
    return http.get(`/menu/${restaurantId}`, { params })
  },
  addMenuItem(data) {
    return http.post('/menu', data)
  },
  updateMenuItem(id, data) {
    return http.put(`/menu/${id}`, data)
  },
  deleteMenuItem(id) {
    return http.delete(`/menu/${id}`)
  },

  // Reviews
  getReviews(restaurantId, params = {}) {
    return http.get(`/reviews/${restaurantId}`, { params })
  },
  submitReview(data) {
    return http.post('/reviews', data)
  },


  deleteReview(id) {
    return http.delete(`/reviews/${id}`)
  }
}


