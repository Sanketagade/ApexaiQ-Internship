<template>
  <div>
    <!-- Hero Section -->
    <v-sheet color="primary" class="hero-section" tile>
      <v-container style="max-width:1280px;">
        <v-row align="center">
          <v-col cols="12" md="7">
            <h1 class="hero-title white--text mb-3">
              Find your next<br>
              <span class="secondary--text">great meal</span>
            </h1>
            <p class="hero-subtitle mb-6">
              Discover top-rated restaurants, explore menus, and read genuine reviews.
            </p>

            <!-- Search -->
            <v-text-field
              v-model="searchQuery"
              placeholder="Search restaurants, cuisine or location..."
              solo
              flat
              dense
              hide-details
              clearable
              prepend-inner-icon="mdi-magnify"
              class="search-field"
              style="border-radius:12px; max-width:560px;"
              @input="onSearch"
              @click:clear="clearSearch"
            />
          </v-col>

          <v-col cols="12" md="5" class="d-none d-md-flex justify-end">
            <div class="d-flex flex-wrap" style="gap:12px; max-width:320px; justify-content:flex-end;">
              <v-chip v-for="stat in stats" :key="stat.label" color="rgba(255,255,255,0.12)" dark class="pa-4">
                <v-icon left color="secondary">{{ stat.icon }}</v-icon>
                <div>
                  <div class="font-weight-bold white--text" style="font-size:1.1rem; line-height:1;">{{ stat.value }}</div>
                  <div class="grey--text text--lighten-2" style="font-size:0.72rem;">{{ stat.label }}</div>
                </div>
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <!-- Filters -->
    <RestaurantFilters
      :rating-filter.sync="ratingFilter"
      :cuisine-filter.sync="cuisineFilter"
      @clear="clearFilters"
    />

    <!-- Demo mode banner -->
    <v-alert
      v-if="usingMockData"
      color="info"
      dense
      tile
      text
      icon="mdi-information"
      class="mb-0"
      style="border-radius:0;"
    >
      <span style="font-size:0.85rem;">
        <strong>Demo Mode:</strong> Showing sample data. Start the backend server and connect MongoDB to use live data.
      </span>
    </v-alert>

    <!-- Restaurant List -->
    <v-container style="max-width:1280px;" class="py-8">
      <!-- Header -->
      <v-row align="center" class="mb-5">
        <v-col>
          <h2 class="section-title primary--text" style="font-size:1.5rem;">
            Restaurants
            <span v-if="!loading" class="grey--text font-weight-regular" style="font-size:0.9rem; font-family:'DM Sans',sans-serif;">
              — {{ filteredRestaurants.length }} found
            </span>
          </h2>
        </v-col>
        <v-col cols="auto">
          <v-btn-toggle v-model="viewMode" mandatory dense color="primary">
            <v-btn small icon value="grid"><v-icon small>mdi-view-grid</v-icon></v-btn>
            <v-btn small icon value="list"><v-icon small>mdi-view-list</v-icon></v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>

      <!-- Loading -->
      <div v-if="loading" class="text-center py-16">
        <v-progress-circular indeterminate color="secondary" size="52" width="3" />
        <p class="grey--text mt-4">Loading restaurants...</p>
      </div>

      <!-- Empty -->
      <div v-else-if="filteredRestaurants.length === 0" class="text-center py-16">
        <v-icon size="72" color="grey lighten-2">mdi-silverware-fork-knife</v-icon>
        <h3 class="section-title grey--text mt-4 mb-2">No restaurants found</h3>
        <p class="grey--text text--lighten-1">Try adjusting your search or filters</p>
        <v-btn color="secondary" class="text-none mt-3 font-weight-bold primary--text" depressed @click="clearFilters">
          Clear Filters
        </v-btn>
      </div>

      <!-- Grid View -->
      <v-row v-else-if="viewMode === 'grid'">
        <v-col
          v-for="restaurant in filteredRestaurants"
          :key="restaurant._id"
          cols="12" sm="6" lg="4"
        >
          <RestaurantCard :restaurant="restaurant" @click="goToRestaurant" />
        </v-col>
      </v-row>

      <!-- List View -->
      <div v-else>
        <v-card
          v-for="restaurant in filteredRestaurants"
          :key="restaurant._id"
          class="mb-3 list-card"
          elevation="1"
          rounded="lg"
          style="border:1px solid #E8E3D9; cursor:pointer;"
          @click="goToRestaurant(restaurant)"
        >
          <v-row no-gutters>
            <v-col cols="3" md="2">
              <v-img
                :src="restaurant.image"
                height="100"
                cover
                style="border-radius:8px 0 0 8px;"
              />
            </v-col>
            <v-col class="pa-3">
              <v-row no-gutters align="center">
                <v-col>
                  <div class="font-weight-bold primary--text" style="font-family:'Playfair Display',serif; font-size:1.05rem;">{{ restaurant.name }}</div>
                  <div class="grey--text d-flex align-center" style="font-size:0.8rem;">
                    <v-icon size="12" class="mr-1">mdi-map-marker</v-icon>{{ restaurant.location }}
                    <v-chip x-small color="grey lighten-3" class="ml-2" style="font-size:0.7rem;">{{ restaurant.cuisine_type }}</v-chip>
                  </div>
                </v-col>
                <v-col cols="auto" class="d-flex align-center" style="gap:12px;">
                  <div class="d-flex align-center">
                    <v-icon color="secondary" size="15" class="mr-1">mdi-star</v-icon>
                    <span class="font-weight-bold" style="font-size:0.9rem;">{{ restaurant.average_rating.toFixed(1) }}</span>
                    <span class="grey--text ml-1" style="font-size:0.75rem;">({{ restaurant.total_reviews }})</span>
                  </div>
                  <v-chip x-small color="secondary" dark class="font-weight-bold">{{ restaurant.price_range }}</v-chip>
                  <v-icon color="grey">mdi-chevron-right</v-icon>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RestaurantCard from '../components/restaurant/RestaurantCard.vue'
import RestaurantFilters from '../components/restaurant/RestaurantFilters.vue'

export default {
  name: 'HomeView',
  components: { RestaurantCard, RestaurantFilters },

  data() {
    return {
      searchQuery: '',
      ratingFilter: 0,
      cuisineFilter: 'All',
      viewMode: 'grid',
      searchTimeout: null
    }
  },

  computed: {
    ...mapGetters(['restaurants', 'loading', 'usingMockData']),
    filteredRestaurants() {
      let list = [...this.restaurants]
      const q = (this.searchQuery || '').toLowerCase().trim()
      if (q) {
        list = list.filter(r =>
          r.name.toLowerCase().includes(q) ||
          r.location.toLowerCase().includes(q) ||
          r.cuisine_type.toLowerCase().includes(q)
        )
      }
      if (this.ratingFilter > 0) {
        list = list.filter(r => r.average_rating >= this.ratingFilter)
      }
      if (this.cuisineFilter && this.cuisineFilter !== 'All') {
        list = list.filter(r => r.cuisine_type === this.cuisineFilter)
      }
      return list
    },
    stats() {
      return [
        { icon: 'mdi-store', value: this.restaurants.length + '+', label: 'Restaurants' },
        { icon: 'mdi-food', value: '200+', label: 'Dishes' },
        { icon: 'mdi-star', value: '4.6', label: 'Avg Rating' }
      ]
    }
  },

  created() {
    if (!this.restaurants.length) {
      this.$store.dispatch('fetchRestaurants')
    }
  },

  methods: {
    onSearch() {
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {}, 300)
    },
    clearSearch() { this.searchQuery = '' },
    clearFilters() {
      this.searchQuery = ''
      this.ratingFilter = 0
      this.cuisineFilter = 'All'
    },
    goToRestaurant(restaurant) {
      this.$router.push({ name: 'restaurant-detail', params: { id: restaurant._id } })
    }
  }
}
</script>

<style scoped>
.hero-section {
  padding: 64px 0 72px;
  background: linear-gradient(135deg, #1C1C1E 0%, #2D2D30 60%, #3A2E20 100%) !important;
}
.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.15;
}
.hero-subtitle {
  color: rgba(255,255,255,0.6);
  font-size: 1.05rem;
  font-weight: 300;
}
.search-field >>> .v-input__slot {
  border-radius: 12px !important;
}
.list-card:hover {
  box-shadow: 0 8px 24px rgba(0,0,0,0.1) !important;
}
</style>
