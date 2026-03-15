<template>
  <v-card elevation="1" rounded="lg" style="border:1px solid #E8E3D9;">
    <v-card-title class="pt-4">
      <v-icon color="secondary" class="mr-2">mdi-store-plus</v-icon>
      <span class="section-title primary--text">Add New Restaurant</span>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.name" label="Restaurant Name *" outlined dense color="primary"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.cuisine_type" :items="cuisines" label="Cuisine Type *" outlined dense color="primary"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="form.description" label="Description *" outlined dense rows="2" color="primary"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.location" label="City / Location *" outlined dense color="primary"
              prepend-inner-icon="mdi-map-marker" :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.address" label="Full Address *" outlined dense color="primary"
              prepend-inner-icon="mdi-home" :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.phone" label="Phone" outlined dense color="primary"
              prepend-inner-icon="mdi-phone" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.email" label="Email" outlined dense color="primary"
              prepend-inner-icon="mdi-email" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.opening_time" label="Opening Time *" outlined dense color="primary"
              placeholder="11:00 AM" prepend-inner-icon="mdi-clock-start"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.closing_time" label="Closing Time *" outlined dense color="primary"
              placeholder="10:00 PM" prepend-inner-icon="mdi-clock-end"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="form.price_range" :items="priceRanges" label="Price Range" outlined dense color="primary"
              prepend-inner-icon="mdi-currency-usd" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.image" label="Image URL" outlined dense color="primary"
              prepend-inner-icon="mdi-image" placeholder="https://..." />
          </v-col>
          <v-col cols="12">
            <v-combobox v-model="form.features" label="Features (press Enter to add)" outlined dense multiple small-chips
              color="primary" prepend-inner-icon="mdi-tag" />
          </v-col>
        </v-row>

        <div class="d-flex gap-3 mt-2">
          <v-btn color="secondary" depressed large class="text-none font-weight-bold primary--text mr-3"
            style="border-radius:10px;" :loading="submitting" :disabled="!valid" @click="submit">
            <v-icon left>mdi-plus</v-icon>
            Add Restaurant
          </v-btn>
          <v-btn text color="grey" class="text-none" @click="reset">Reset</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AddRestaurantForm',
  data() {
    return {
      valid: false,
      submitting: false,
      form: {
        name: '', description: '', location: '', address: '',
        phone: '', email: '', image: '', cuisine_type: '',
        opening_time: '', closing_time: '', price_range: '$$', features: []
      },
      cuisines: ['American', 'Italian', 'Japanese', 'Mexican', 'Indian', 'French', 'Chinese', 'Thai', 'Mediterranean', 'Korean', 'Other'],
      priceRanges: ['₹ 100-₹200', '₹200- ₹400', '₹500-₹1000', 'above ₹1000']
    }
  },
  methods: {
    async submit() {
      this.$refs.form.validate()
      if (!this.valid) return
      this.submitting = true
      try {
        const ok = await this.$store.dispatch('addRestaurant', this.form)
        if (ok) { this.reset(); this.$emit('added') }
      } finally {
        this.submitting = false
      }
    },
    reset() {
      this.$refs.form.reset()
      this.form = { name: '', description: '', location: '', address: '', phone: '', email: '', image: '', cuisine_type: '', opening_time: '', closing_time: '', price_range: '$$', features: [] }
    }
  }
}
</script>
