<template>
  <v-card elevation="1" rounded="lg" style="border:1px solid #E8E3D9;">
    <v-card-title class="pt-4">
      <v-icon color="secondary" class="mr-2">mdi-food-fork-drink</v-icon>
      <span class="section-title primary--text">Add Menu Item</span>
    </v-card-title>

    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit">
        <v-row>
          <v-col cols="12" md="6">
            <v-autocomplete
              v-model="form.restaurant_id"
              :items="restaurants"
              item-text="name"
              item-value="_id"
              label="Select Restaurant *"
              outlined dense color="primary"
              prepend-inner-icon="mdi-store"
              :rules="[v => !!v || 'Required']"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="form.item_name" label="Item Name *" outlined dense color="primary"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="form.description" label="Description" outlined dense color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model.number="form.price" label="Price (₹) *" outlined dense color="primary"
              type="number" min="0" step="0.01" prepend-inner-icon="mdi-currency-usd"
              :rules="[v => (v !== '' && v >= 0) || 'Required']" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="form.category" :items="categories" label="Category *" outlined dense color="primary"
              :rules="[v => !!v || 'Required']" />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model.number="form.preparation_time" label="Prep Time (min)" outlined dense
              color="primary" type="number" min="1" prepend-inner-icon="mdi-timer" />
          </v-col>
          <v-col cols="12">
            <div class="d-flex flex-wrap" style="gap:16px;">
              <v-switch v-model="form.is_available" label="Available" color="success" dense inset />
              <v-switch v-model="form.is_vegetarian" label="Vegetarian" color="green" dense inset />
              <v-switch v-model="form.is_vegan" label="Vegan" color="green darken-2" dense inset />
              <v-switch v-model="form.is_gluten_free" label="Gluten-Free" color="orange darken-1" dense inset />
            </div>
          </v-col>
        </v-row>

        <div class="mt-2 d-flex">
          <v-btn color="secondary" depressed large class="text-none font-weight-bold primary--text mr-3"
            style="border-radius:10px;" :loading="submitting" :disabled="!valid" @click="submit">
            <v-icon left>mdi-plus</v-icon>
            Add Item
          </v-btn>
          <v-btn text color="grey" class="text-none" @click="reset">Reset</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddMenuItemForm',
  data() {
    return {
      valid: false,
      submitting: false,
      form: {
        restaurant_id: '', item_name: '', description: '',
        price: '', category: '', preparation_time: 15,
        is_available: true, is_vegetarian: false, is_vegan: false, is_gluten_free: false
      },
      categories: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Salad', 'Soup', 'Sides', 'Special']
    }
  },
  computed: {
    ...mapGetters(['restaurants'])
  },
  methods: {
    async submit() {
      this.$refs.form.validate()
      if (!this.valid) return
      this.submitting = true
      try {
        const ok = await this.$store.dispatch('addMenuItem', this.form)
        if (ok) { this.reset(); this.$emit('added') }
      } finally {
        this.submitting = false
      }
    },
    reset() {
      this.$refs.form.reset()
      this.form = { restaurant_id: '', item_name: '', description: '', price: '', category: '', preparation_time: 15, is_available: true, is_vegetarian: false, is_vegan: false, is_gluten_free: false }
    }
  }
}
</script>
