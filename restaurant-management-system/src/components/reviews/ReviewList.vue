<template>
  <v-card elevation="1" rounded="lg" class="mb-5" style="border:1px solid #E8E3D9;">
    <v-card-title class="pb-1 pt-4">
      <span class="section-title primary--text" style="font-size:1.3rem;">Reviews</span>
      <v-spacer />
      <v-chip small color="secondary" dark class="font-weight-bold">{{ reviews.length }}</v-chip>
    </v-card-title>

    <v-card-text>
      <!-- Rating Summary -->
      <v-row v-if="reviews.length > 0" class="mb-4">
        <v-col cols="auto" class="text-center pr-6">
          <div class="rating-big">{{ avgRating }}</div>
          <v-rating
            :value="parseFloat(avgRating)"
            readonly
            half-increments
            dense
            color="secondary"
            background-color="grey lighten-2"
            size="16"
          />
          <div class="grey--text mt-1" style="font-size:0.75rem;">{{ reviews.length }} reviews</div>
        </v-col>

        <v-divider vertical class="mx-3" />

        <v-col>
          <div v-for="n in [5,4,3,2,1]" :key="n" class="d-flex align-center mb-2" style="gap:6px;">
            <span class="grey--text font-weight-medium" style="font-size:0.78rem; min-width:10px;">{{ n }}</span>
            <v-icon size="12" color="secondary">mdi-star</v-icon>
            <v-progress-linear
              :value="getRatingPercent(n)"
              color="secondary"
              background-color="grey lighten-3"
              rounded
              height="6"
              style="flex:1;"
            />
            <span class="grey--text" style="font-size:0.72rem; min-width:18px;">{{ ratingDist[n] || 0 }}</span>
          </div>
        </v-col>
      </v-row>

      <v-divider v-if="reviews.length > 0" class="mb-4" />

      <!-- Loading -->
      <div v-if="loading" class="text-center py-6">
        <v-progress-circular indeterminate color="secondary" size="32" />
      </div>

      <!-- Empty -->
      <div v-else-if="reviews.length === 0" class="text-center py-6">
        <v-icon size="48" color="grey lighten-2">mdi-comment-outline</v-icon>
        <p class="grey--text mt-2 mb-0">No reviews yet. Be the first!</p>
      </div>

      <!-- Review Cards -->
      <div v-else>
        <v-card
          v-for="review in reviews"
          :key="review._id"
          flat
          outlined
          rounded="lg"
          class="mb-3 pa-4"
          style="border:1px solid #F0EDE8 !important;"
        >
          <v-row no-gutters justify="space-between" align="start">
            <v-col>
              <div class="font-weight-semibold primary--text" style="font-size:0.95rem;">{{ review.user_name }}</div>
              <div class="d-flex align-center mt-1" style="gap:8px;">
                <v-rating
                  :value="review.rating"
                  readonly dense
                  color="secondary"
                  background-color="grey lighten-2"
                  size="14"
                />
                <v-chip x-small outlined color="info" class="font-weight-medium" style="font-size:0.7rem;">
                  {{ review.visit_type }}
                </v-chip>
              </div>
            </v-col>
            <v-col cols="auto">
              <span class="grey--text" style="font-size:0.78rem;">{{ formatDate(review.date) }}</span>
            </v-col>
          </v-row>
          <p class="mt-2 mb-0 grey--text text--darken-1" style="font-size:0.9rem; line-height:1.6;">{{ review.comment }}</p>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ReviewList',
  props: {
    reviews: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
  },
  computed: {
    avgRating() {
      if (!this.reviews.length) return '0.0'
      const avg = this.reviews.reduce((s, r) => s + r.rating, 0) / this.reviews.length
      return avg.toFixed(1)
    },
    ratingDist() {
      const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      this.reviews.forEach(r => { dist[r.rating] = (dist[r.rating] || 0) + 1 })
      return dist
    }
  },
  methods: {
    getRatingPercent(n) {
      if (!this.reviews.length) return 0
      return Math.round(((this.ratingDist[n] || 0) / this.reviews.length) * 100)
    },
    formatDate(d) {
      return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }
  }
}
</script>

<style scoped>
.rating-big {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #1C1C1E;
  line-height: 1;
}
</style>
