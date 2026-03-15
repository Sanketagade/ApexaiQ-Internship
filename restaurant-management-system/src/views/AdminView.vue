<template>
  <div>
    <!-- Header -->
    <v-sheet color="primary" tile class="py-8">
      <v-container style="max-width:1280px;">
        <div class="d-flex align-center">
          <v-icon color="secondary" size="32" class="mr-3">mdi-shield-account</v-icon>
          <div>
            <h1 class="white--text" style="font-family:'Playfair Display',serif; font-size:1.8rem; font-weight:700;">Admin Panel</h1>
            <p class="grey--text text--lighten-1 mb-0" style="font-size:0.85rem;">Manage restaurants, menus, and content</p>
          </div>
        </div>
      </v-container>
    </v-sheet>

    <v-container style="max-width:1280px;" class="py-8">
      <!-- Stats Row -->
      <v-row class="mb-6">
        <v-col v-for="stat in adminStats" :key="stat.label" cols="12" sm="6" md="3">
          <v-card elevation="1" rounded="lg" style="border:1px solid #E8E3D9;">
            <v-card-text class="pa-4">
              <div class="d-flex align-center justify-space-between">
                <div>
                  <div class="grey--text caption font-weight-bold text-uppercase" style="letter-spacing:0.8px;">{{ stat.label }}</div>
                  <div class="primary--text font-weight-bold mt-1" style="font-family:'Playfair Display',serif; font-size:1.8rem; line-height:1;">{{ stat.value }}</div>
                </div>
                <v-avatar :color="stat.color" size="44">
                  <v-icon dark>{{ stat.icon }}</v-icon>
                </v-avatar>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tabs -->
      <v-tabs v-model="activeTab" color="secondary" background-color="transparent" class="mb-6">
        <v-tab class="text-none font-weight-semibold">
          <v-icon left small>mdi-store-plus</v-icon>
          Add Restaurant
        </v-tab>
        <v-tab class="text-none font-weight-semibold">
          <v-icon left small>mdi-food-fork-drink</v-icon>
          Add Menu Item
        </v-tab>
        <v-tab class="text-none font-weight-semibold">
          <v-icon left small>mdi-view-list</v-icon>
          All Restaurants
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <!-- Add Restaurant Tab -->
        <v-tab-item>
          <AddRestaurantForm @added="onRestaurantAdded" />
        </v-tab-item>

        <!-- Add Menu Item Tab -->
        <v-tab-item>
          <AddMenuItemForm @added="onMenuItemAdded" />
        </v-tab-item>

        <!-- All Restaurants Tab -->
        <v-tab-item>
          <v-card elevation="1" rounded="lg" style="border:1px solid #E8E3D9;">
            <v-card-title class="pt-4">
              <span class="section-title primary--text">All Restaurants</span>
              <v-spacer />
              <v-text-field
                v-model="tableSearch"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                dense
                outlined
                style="max-width:260px;"
              />
            </v-card-title>

            <v-data-table
              :headers="tableHeaders"
              :items="restaurants"
              :search="tableSearch"
              :loading="loading"
              :items-per-page="10"
              color="primary"
              class="pa-2"
            >
              <template v-slot:item.image="{ item }">
                <v-avatar size="40" rounded class="my-2">
                  <v-img :src="item.image" />
                </v-avatar>
              </template>

              <template v-slot:item.average_rating="{ item }">
                <div class="d-flex align-center">
                  <v-icon color="secondary" size="14" class="mr-1">mdi-star</v-icon>
                  <span class="font-weight-bold" style="font-size:0.88rem;">{{ item.average_rating.toFixed(1) }}</span>
                </div>
              </template>

              <template v-slot:item.price_range="{ item }">
                <v-chip x-small color="secondary" dark class="font-weight-bold">{{ item.price_range }}</v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon small color="primary" @click="viewRestaurant(item)">
                  <v-icon small>mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddRestaurantForm from '../components/admin/AddRestaurantForm.vue'
import AddMenuItemForm from '../components/admin/AddMenuItemForm.vue'

export default {
  name: 'AdminView',
  components: { AddRestaurantForm, AddMenuItemForm },

  data() {
    return {
      activeTab: 0,
      tableSearch: '',
      tableHeaders: [
        { text: 'Image', value: 'image', sortable: false, width: 60 },
        { text: 'Name', value: 'name' },
        { text: 'Cuisine', value: 'cuisine_type' },
        { text: 'Location', value: 'location' },
        { text: 'Rating', value: 'average_rating' },
        { text: 'Price', value: 'price_range' },
        { text: 'Reviews', value: 'total_reviews' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },

  computed: {
    ...mapGetters(['restaurants', 'loading']),
    adminStats() {
      const totalReviews = this.restaurants.reduce((s, r) => s + r.total_reviews, 0)
      const avgRating = this.restaurants.length
        ? (this.restaurants.reduce((s, r) => s + r.average_rating, 0) / this.restaurants.length).toFixed(1)
        : '0.0'
      return [
        { label: 'Restaurants', value: this.restaurants.length, icon: 'mdi-store', color: 'primary' },
        { label: 'Total Reviews', value: totalReviews, icon: 'mdi-comment', color: 'secondary' },
        { label: 'Avg Rating', value: avgRating, icon: 'mdi-star', color: 'warning' },
        { label: 'Cuisines', value: [...new Set(this.restaurants.map(r => r.cuisine_type))].length, icon: 'mdi-food', color: 'success' }
      ]
    }
  },

  created() {
    if (!this.restaurants.length) {
      this.$store.dispatch('fetchRestaurants')
    }
  },

  methods: {
    onRestaurantAdded() {
      this.activeTab = 2
    },
    onMenuItemAdded() {
      this.$store.dispatch('showSnackbar', { message: 'Menu item added!', color: 'success', icon: 'mdi-check-circle' })
    },
    viewRestaurant(restaurant) {
      this.$router.push({ name: 'restaurant-detail', params: { id: restaurant._id } })
    }
  }
}
</script>
