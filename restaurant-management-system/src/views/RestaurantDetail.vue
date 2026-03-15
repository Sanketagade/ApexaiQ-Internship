<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-16">
      <v-progress-circular indeterminate color="secondary" size="52" width="3" />
      <p class="grey--text mt-4">Loading restaurant...</p>
    </div>

    <!-- Not Found -->
    <v-container v-else-if="!restaurant" class="text-center py-16">
      <v-icon size="80" color="grey lighten-2">mdi-store-off</v-icon>
      <h2 class="section-title grey--text mt-4">Restaurant Not Found</h2>
      <v-btn color="secondary" class="text-none mt-4 font-weight-bold primary--text" depressed @click="$router.push('/')">
        Back to Home
      </v-btn>
    </v-container>



    <!-- Main Content -->
    <div v-else>
      <!-- Hero Image -->
      <div class="detail-hero" style="position:relative; overflow:hidden;">
        <v-img
          :src="restaurant.image"
          height="400"
          gradient="to bottom, transparent 30%, rgba(28,28,30,0.85) 100%"
        >
          <template v-slot:placeholder>
            <v-sheet color="grey lighten-2" height="400" class="d-flex align-center justify-center">
              <v-progress-circular indeterminate color="secondary" />
            </v-sheet>
          </template>

          <!-- Hero Content Overlay -->
          <v-container style="max-width:1280px; height:100%;" class="d-flex flex-column justify-end pb-8">
            <v-chip color="secondary" dark small class="mb-3 font-weight-bold" style="width:fit-content; letter-spacing:0.5px; text-transform:uppercase; font-size:0.72rem;">
              {{ restaurant.cuisine_type }}
            </v-chip>

            <h1 class="detail-title white--text mb-3">{{ restaurant.name }}</h1>

            <div class="d-flex align-center flex-wrap white--text" style="gap:16px;">
              <!-- Rating -->
              <div class="d-flex align-center">
                <v-icon color="secondary" class="mr-1">mdi-star</v-icon>
                <span class="font-weight-bold mr-1" style="font-size:1.1rem;">{{ restaurant.average_rating.toFixed(1) }}</span>
                <span style="color:rgba(255,255,255,0.6); font-size:0.85rem;">({{ restaurant.total_reviews }} reviews)</span>
              </div>
              <span style="color:rgba(255,255,255,0.3);">|</span>
              <!-- Price -->
              <span style="color:rgba(255,255,255,0.8);">{{ restaurant.price_range }}</span>
              <span style="color:rgba(255,255,255,0.3);">|</span>
              <!-- Hours -->
              <div class="d-flex align-center">
                <v-icon size="16" class="mr-1" color="rgba(255,255,255,0.6)">mdi-clock-outline</v-icon>
                <span style="color:rgba(255,255,255,0.8); font-size:0.9rem;">{{ restaurant.opening_time }} – {{ restaurant.closing_time }}</span>
              </div>
            </div>
          </v-container>
        </v-img>
      </div>

      <!-- Body Content -->
      <v-container style="max-width:1280px;" class="py-8">
        <v-row>
          <!-- Left: Main Content -->
          <v-col cols="12" md="8">

            <!-- About -->
            <v-card elevation="1" rounded="lg" class="mb-5" style="border:1px solid #E8E3D9;">
              <v-card-title class="pt-4 pb-1">
                <span class="section-title primary--text" style="font-size:1.3rem;">About</span>
              </v-card-title>
              <v-card-text>
                <p class="grey--text text--darken-1 mb-3" style="font-size:0.95rem; line-height:1.75;">
                  {{ restaurant.description }}
                </p>
                <div v-if="restaurant.features && restaurant.features.length" class="d-flex flex-wrap" style="gap:6px;">
                  <v-chip
                    v-for="feature in restaurant.features"
                    :key="feature"
                    small outlined color="primary"
                    class="font-weight-medium" style="font-size:0.78rem;"
                  >
                    {{ feature }}
                  </v-chip>
                </div>
              </v-card-text>
            </v-card>

            <!-- Menu -->
            <MenuSection :grouped="menuGrouped" :loading="menuLoading" />

            <!-- Reviews -->
            <ReviewList :reviews="reviews" :loading="reviewsLoading" />

            <!-- Add Review -->
            <AddReviewForm :restaurant-id="restaurantId" @submitted="onReviewSubmitted" />
          </v-col>

          <!-- Right: Info Sidebar -->
          <v-col cols="12" md="4">
            <v-card elevation="1" rounded="lg" class="mb-4" style="border:1px solid #E8E3D9; position:sticky; top:80px;">
              <v-card-title class="pt-4 pb-1">
                <v-icon color="secondary" class="mr-2">mdi-information</v-icon>
                <span class="section-title primary--text" style="font-size:1.1rem;">Details</span>
              </v-card-title>
              
              <v-list dense class="pa-2">
                <!-- Address -->
                <v-list-item class="px-2 mb-2">
                  <v-list-item-icon class="mr-2 mt-3">
                    <v-icon color="accent" size="20">mdi-map-marker</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">Address</v-list-item-subtitle>
                    <v-list-item-title class="text-wrap primary--text font-weight-medium" style="font-size:0.9rem; line-height:1.4; white-space:normal;">
                      {{ restaurant.address }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- Hours -->
                <v-list-item class="px-2 mb-2">
                  <v-list-item-icon class="mr-2 mt-3">
                    <v-icon color="success" size="20">mdi-clock-outline</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">Hours</v-list-item-subtitle>
                    <v-list-item-title class="primary--text font-weight-medium" style="font-size:0.9rem;">
                      {{ restaurant.opening_time }} – {{ restaurant.closing_time }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- Phone -->
                <v-list-item v-if="restaurant.phone" class="px-2 mb-2">
                  <v-list-item-icon class="mr-2 mt-3">
                    <v-icon color="secondary" size="20">mdi-phone</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">Phone</v-list-item-subtitle>
                    <v-list-item-title class="primary--text font-weight-medium" style="font-size:0.9rem;">{{ restaurant.phone }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- Email -->
                <v-list-item v-if="restaurant.email" class="px-2 mb-2">
                  <v-list-item-icon class="mr-2 mt-3">
                    <v-icon color="info" size="20">mdi-email</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">Email</v-list-item-subtitle>
                    <v-list-item-title class="primary--text font-weight-medium text-truncate" style="font-size:0.9rem;">{{ restaurant.email }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

<!-- Tables Info -->

<v-list-item class="px-2 mb-2">
  <v-list-item-icon class="mr-2 mt-3">
    <v-icon color="primary" size="20">mdi-table-chair</v-icon>
  </v-list-item-icon>

  <v-list-item-content>
    <v-list-item-subtitle
      style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">
      Total Tables
    </v-list-item-subtitle>

    <v-list-item-title class="primary--text font-weight-medium">
      {{ restaurant.total_tables }}
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>


<v-list-item class="px-2 mb-2">
  <v-list-item-icon class="mr-2 mt-3">
    <v-icon color="green" size="20">mdi-check-circle</v-icon>
  </v-list-item-icon>

  <v-list-item-content>
    <v-list-item-subtitle
      style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">
      Available Tables
    </v-list-item-subtitle>

    <v-list-item-title class="green--text font-weight-medium">
      {{ restaurant.tables_available }}
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>


<v-list-item class="px-2 mb-2">
  <v-list-item-icon class="mr-2 mt-3">
    <v-icon color="red" size="20">mdi-close-circle</v-icon>
  </v-list-item-icon>

  <v-list-item-content>
    <v-list-item-subtitle
      style="font-size:0.7rem; letter-spacing:0.8px; text-transform:uppercase;">
      Reserved Tables
    </v-list-item-subtitle>

    <v-list-item-title class="red--text font-weight-medium">
      {{ restaurant.tables_reserved }}
    </v-list-item-title>
  </v-list-item-content>
</v-list-item>

              </v-list>

              <v-divider class="mx-4" />

            <v-card-text class="pb-4 pt-3">
  <div class="caption grey--text font-weight-bold text-uppercase mb-2" style="letter-spacing:0.8px;">
    Average Price
  </div>
  <div class="d-flex align-center" style="gap:4px; font-weight:600;">
    <span style="color:#C9A84C; font-size:1.2rem;">
      ₹ 100- ₹ 1000 {{ restaurant.avg_price }}
    </span>
  </div>
</v-card-text>


              <!-- Rating Summary -->
              <v-divider class="mx-4" />
              <v-card-text class="pb-4 pt-3">
                <div class="caption grey--text font-weight-bold text-uppercase mb-2" style="letter-spacing:0.8px;">Overall Rating</div>
                <div class="d-flex align-center" style="gap:10px;">
                  <span class="font-weight-bold primary--text" style="font-family:'Playfair Display',serif; font-size:2.2rem; line-height:1;">
                    {{ restaurant.average_rating.toFixed(1) }}
                  </span>
                  <div>
                    <v-rating :value="restaurant.average_rating" readonly half-increments dense color="secondary" background-color="grey lighten-2" size="16" />
                    <div class="grey--text" style="font-size:0.75rem;">{{ restaurant.total_reviews }} reviews</div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuSection from '../components/menu/MenuSection.vue'
import ReviewList from '../components/reviews/ReviewList.vue'
import AddReviewForm from '../components/reviews/AddReviewForm.vue'

export default {
  name: 'RestaurantDetail',
  components: { MenuSection, ReviewList, AddReviewForm },

  computed: {
    ...mapGetters({
      restaurant: 'selectedRestaurant',
      menuGrouped: 'menuGrouped',
      reviews: 'reviews',
      loading: 'loading',
      menuLoading: 'menuLoading',
      reviewsLoading: 'reviewsLoading'
    }),
    restaurantId() { return this.$route.params.id },
    priceLevel() {
      const map = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 }
      return map[this.restaurant?.price_range] || 2
    },
    priceLabel() {
      const map = { '$': 'Budget', '$$': 'Moderate', '$$$': 'Upscale', '$$$$': 'Fine Dining' }
      return map[this.restaurant?.price_range] || ''
    }
  },

  created() {
    this.loadData()
  },

  methods: {
    async loadData() {
      await this.$store.dispatch('fetchRestaurantById', this.restaurantId)
      await Promise.all([
        this.$store.dispatch('fetchMenu', this.restaurantId),
        this.$store.dispatch('fetchReviews', this.restaurantId)
      ])
    },
    onReviewSubmitted() {
      this.$store.dispatch('fetchReviews', this.restaurantId)
    }
  }
}
</script>

<style scoped>
.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
}
</style>
