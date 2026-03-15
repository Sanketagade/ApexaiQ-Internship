<template>
  <v-card elevation="1" rounded="lg" style="border:1px solid #E8E3D9;">
    <v-card-title class="pt-4 pb-1">
      <v-icon color="secondary" class="mr-2">mdi-pencil</v-icon>
      <span class="section-title primary--text" style="font-size:1.3rem;">Write a Review</span>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">

        <!-- Star Rating -->
        <div class="mb-4">
          <label class="caption grey--text font-weight-bold text-uppercase mb-2 d-block" style="letter-spacing:0.8px;">
            Your Rating *
          </label>
          <div class="d-flex align-center">
            <v-rating
              v-model="form.rating"
              color="secondary"
              background-color="grey lighten-2"
              size="34"
              hover
              :rules="[v => v > 0 || 'Rating required']"
            
            />
            <span v-if="form.rating" class="ml-2 font-weight-bold primary--text" style="font-size:1.1rem;">
              {{ ratingLabel }}
            </span>
          </div>
          <div v-if="showRatingError" class="error--text mt-1" style="font-size:0.75rem;">Please select a rating</div>
        </div>

        <!-- Name -->
        <v-text-field
          v-model="form.user_name"
          label="Your Name"
          outlined
          dense
          prepend-inner-icon="mdi-account"
          :rules="[v => !!v || 'Name is required']"
          required
          class="mb-2"
          color="primary"
        />

        <!-- Visit Type -->
        <v-select
          v-model="form.visit_type"
          :items="visitTypes"
          label="Visit Type"
          outlined
          dense
          prepend-inner-icon="mdi-store"
          class="mb-2"
          color="primary"
        />

        <!-- Comment -->
        <v-textarea
          v-model="form.comment"
          label="Share your experience"
          outlined
          dense
          rows="3"
          prepend-inner-icon="mdi-comment-text"
          :rules="[v => !!v || 'Comment is required', v => v.length >= 10 || 'At least 10 characters']"
          required
          counter="500"
          maxlength="500"
          class="mb-3"
          color="primary"
        />

        <v-btn
          color="secondary"
          depressed
          large
          :loading="submitting"
          :disabled="!valid || form.rating === 0"
          class="text-none font-weight-bold primary--text"
          style="border-radius:10px;"
          @click="submit"
        >
          <v-icon left>mdi-send</v-icon>
          Submit Review
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddReviewForm',
  props: {
    restaurantId: { type: String, required: true }
  },
  data() {
    return {
      valid: true,
      submitting: false,
      showRatingError: false,
      form: {
        user_name: '',
        rating: 0,
        comment: '',
        visit_type: 'Dine-in'
      },
      visitTypes: ['Dine-in', 'Takeout', 'Delivery', 'Other']
    }
  },
  computed: {
    ratingLabel() {
      const labels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent!' }
      return labels[this.form.rating] || ''
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate()
      if (!this.form.rating) {
        this.showRatingError = true
        return
      }
      if (!this.valid) return

      this.submitting = true
      this.showRatingError = false
      try {
        await this.$store.dispatch('submitReview', {
          ...this.form,
          restaurant_id: this.restaurantId
        })
        this.$refs.form.reset()
        this.form = { user_name: '', rating: 0, comment: '', visit_type: 'Dine-in' }
        this.$emit('submitted')
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
