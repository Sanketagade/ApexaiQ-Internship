import Vue from 'vue'
import Vuex from 'vuex'
import api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    restaurants: [],
    selectedRestaurant: null,
    menuItems: [],
    menuGrouped: {},
    reviews: [],
    loading: false,
    menuLoading: false,
    reviewsLoading: false,
    snackbar: { show: false, message: '', color: 'success', icon: 'mdi-check-circle' },
    usingMockData: false
  },

  getters: {
    restaurants: state => state.restaurants,
    selectedRestaurant: state => state.selectedRestaurant,
    menuGrouped: state => state.menuGrouped,
    menuItems: state => state.menuItems,
    reviews: state => state.reviews,
    loading: state => state.loading,
    menuLoading: state => state.menuLoading,
    reviewsLoading: state => state.reviewsLoading,
    snackbar: state => state.snackbar,
    usingMockData: state => state.usingMockData,
    ratingDistribution: state => {
      const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      state.reviews.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1 })
      return dist
    }
  },

  mutations: {
    SET_RESTAURANTS(state, restaurants) { state.restaurants = restaurants },
    SET_SELECTED_RESTAURANT(state, restaurant) { state.selectedRestaurant = restaurant },
    SET_MENU_ITEMS(state, items) { state.menuItems = items },
    SET_MENU_GROUPED(state, grouped) { state.menuGrouped = grouped },
    SET_REVIEWS(state, reviews) { state.reviews = reviews },
    ADD_REVIEW(state, review) { state.reviews.unshift(review) },
    SET_LOADING(state, val) { state.loading = val },
    SET_MENU_LOADING(state, val) { state.menuLoading = val },
    SET_REVIEWS_LOADING(state, val) { state.reviewsLoading = val },
    SET_USING_MOCK(state, val) { state.usingMockData = val },
    SET_SNACKBAR(state, { show, message, color, icon }) {
      state.snackbar = { show, message, color: color || 'success', icon: icon || 'mdi-check-circle' }
    },
    UPDATE_RESTAURANT_RATING(state, { id, avgRating, totalReviews }) {
      const r = state.restaurants.find(r => r._id === id)
      if (r) { r.average_rating = avgRating; r.total_reviews = totalReviews }
      if (state.selectedRestaurant && state.selectedRestaurant._id === id) {
        state.selectedRestaurant.average_rating = avgRating
        state.selectedRestaurant.total_reviews = totalReviews
      }
    }
  },

  actions: {
    async fetchRestaurants({ commit }) {
      commit('SET_LOADING', true)
      try {
        const data = await api.getRestaurants()
        commit('SET_RESTAURANTS', data)
        commit('SET_USING_MOCK', false)
      } catch {
        const { MOCK_RESTAURANTS } = await import('../data/mockData')
        commit('SET_RESTAURANTS', MOCK_RESTAURANTS)
        commit('SET_USING_MOCK', true)
        commit('SET_SNACKBAR', {
          show: true,
          message: 'Demo mode — connect MongoDB for live data',
          color: 'info',
          icon: 'mdi-information'
        })
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchRestaurantById({ commit, state }, id) {
      commit('SET_LOADING', true)
      try {
        if (state.usingMockData) {
          const { MOCK_RESTAURANTS } = await import('../data/mockData')
          const restaurant = MOCK_RESTAURANTS.find(r => r._id === id)
          commit('SET_SELECTED_RESTAURANT', restaurant)
        } else {
          const data = await api.getRestaurantById(id)
          commit('SET_SELECTED_RESTAURANT', data)
        }
      } catch (e) {
        commit('SET_SNACKBAR', { show: true, message: 'Failed to load restaurant', color: 'error', icon: 'mdi-alert' })
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async fetchMenu({ commit, state }, restaurantId) {
      commit('SET_MENU_LOADING', true)
      try {
        if (state.usingMockData) {
          const { getMockMenu } = await import('../data/mockData')
          const { items, grouped } = getMockMenu(restaurantId)
          commit('SET_MENU_ITEMS', items)
          commit('SET_MENU_GROUPED', grouped)
        } else {
          const data = await api.getMenu(restaurantId)
          commit('SET_MENU_ITEMS', data.data)
          commit('SET_MENU_GROUPED', data.grouped)
        }
      } catch {
        commit('SET_SNACKBAR', { show: true, message: 'Failed to load menu', color: 'error', icon: 'mdi-alert' })
      } finally {
        commit('SET_MENU_LOADING', false)
      }
    },

    async fetchReviews({ commit, state }, restaurantId) {
      commit('SET_REVIEWS_LOADING', true)
      try {
        if (state.usingMockData) {
          const { MOCK_REVIEWS } = await import('../data/mockData')
          commit('SET_REVIEWS', MOCK_REVIEWS)
        } else {
          const data = await api.getReviews(restaurantId)
          commit('SET_REVIEWS', data.data)
        }
      } catch {
        commit('SET_REVIEWS', [])
      } finally {
        commit('SET_REVIEWS_LOADING', false)
      }
    },

    async submitReview({ commit, state, dispatch }, payload) {
      if (state.usingMockData) {
        const review = {
          ...payload,
          _id: Date.now().toString(),
          date: new Date().toISOString()
        }
        commit('ADD_REVIEW', review)
        const reviews = [review, ...state.reviews.slice(1)]
        const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        commit('UPDATE_RESTAURANT_RATING', {
          id: payload.restaurant_id,
          avgRating: Math.round(avg * 10) / 10,
          totalReviews: reviews.length
        })
      } else {
        await api.submitReview(payload)
        await dispatch('fetchReviews', payload.restaurant_id)
        await dispatch('fetchRestaurantById', payload.restaurant_id)
      }
      commit('SET_SNACKBAR', { show: true, message: 'Review submitted! Thank you.', color: 'success', icon: 'mdi-check-circle' })
    },

    
    async addRestaurant({ commit, dispatch }, payload) {
      try {
        await api.addRestaurant(payload)
        await dispatch('fetchRestaurants')
        commit('SET_SNACKBAR', { show: true, message: 'Restaurant added successfully!', color: 'success', icon: 'mdi-check-circle' })
        return true
      } catch (e) {
        commit('SET_SNACKBAR', { show: true, message: 'Failed to add restaurant', color: 'error', icon: 'mdi-alert' })
        return false
      }
    },

    async addMenuItem({ commit, dispatch }, payload) {
      try {
        await api.addMenuItem(payload)
        await dispatch('fetchMenu', payload.restaurant_id)
        commit('SET_SNACKBAR', { show: true, message: 'Menu item added!', color: 'success', icon: 'mdi-check-circle' })
        return true
      } catch {
        commit('SET_SNACKBAR', { show: true, message: 'Failed to add menu item', color: 'error', icon: 'mdi-alert' })
        return false
      }
    },

    showSnackbar({ commit }, payload) {
      commit('SET_SNACKBAR', { show: true, ...payload })
    }
  }
})
