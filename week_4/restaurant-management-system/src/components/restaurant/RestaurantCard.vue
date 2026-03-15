<template>
  <v-card
    class="restaurant-card"
    elevation="1"
    rounded="lg"
    @click="$emit('click', restaurant)"
  >
    <!-- Image -->
    <div class="card-img-wrap">
      <v-img
        :src="restaurant.image"
        height="210"
        gradient="to bottom, transparent 60%, rgba(0,0,0,0.5) 100%"
        @error="handleImgError"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="secondary" size="32" />
          </v-row>
        </template>

        <!-- Overlay badges -->
        <div class="d-flex justify-space-between pa-3">
          <v-chip color="rgba(28,28,30,0.82)" dark x-small class="cuisine-chip font-weight-bold" style="backdrop-filter:blur(4px)">
            {{ restaurant.cuisine_type }}
          </v-chip>
          <v-chip color="secondary" x-small class="font-weight-bold primary--text">
            {{ restaurant.price_range }}
          </v-chip>
        </div>
      </v-img>
    </div>

    <!-- Content -->
    <v-card-text class="pb-3 pt-3">
      <div class="restaurant-name mb-1">{{ restaurant.name }}</div>

      <div class="d-flex align-center grey--text mb-3" style="font-size:0.82rem;">
        <v-icon size="13" color="grey" class="mr-1">mdi-map-marker</v-icon>
        {{ restaurant.location }}
      </div>

      <v-divider class="mb-3" />

      <div class="d-flex align-center justify-space-between">
        <!-- Rating -->
        <div class="d-flex align-center">
          <v-icon color="secondary" size="16" class="mr-1">mdi-star</v-icon>
          <span class="font-weight-bold primary--text" style="font-size:0.92rem;">
            {{ restaurant.average_rating.toFixed(1) }}
          </span>
          <span class="grey--text ml-1" style="font-size:0.76rem;">({{ restaurant.total_reviews }})</span>
        </div>

        <!-- Hours -->
        <v-chip x-small color="success" outlined class="font-weight-semibold" style="font-size:0.72rem;">
          <v-icon x-small left>mdi-clock-outline</v-icon>
          {{ restaurant.opening_time }}–{{ restaurant.closing_time }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'RestaurantCard',
  props: {
    restaurant: { type: Object, required: true }
  },
  methods: {
    handleImgError(e) {
      if (e && e.target) {
        e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=60'
      }
    }
  }
}
</script>

<style scoped>
.restaurant-card {
  cursor: pointer;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
  border: 1px solid #E8E3D9 !important;
  overflow: hidden;
}
.restaurant-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 40px rgba(0,0,0,0.12) !important;
}
.restaurant-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1C1C1E;
  line-height: 1.3;
}
.cuisine-chip {
  letter-spacing: 0.3px;
  text-transform: uppercase;
  font-size: 0.68rem !important;
}
</style>
