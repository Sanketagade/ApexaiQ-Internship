<template>
  <v-card elevation="1" rounded="lg" class="mb-5" style="border:1px solid #E8E3D9;">
    <v-card-title class="pb-1 pt-4">
      <span class="section-title primary--text" style="font-size:1.3rem;">Menu</span>
    </v-card-title>
    <v-card-text>
      <div v-if="loading" class="text-center py-8">
        <v-progress-circular indeterminate color="secondary" size="36" />
        <p class="grey--text mt-3 mb-0" style="font-size:0.9rem;">Loading menu...</p>
      </div>

      <div v-else-if="!grouped || Object.keys(grouped).length === 0" class="text-center py-6">
        <v-icon size="48" color="grey lighten-2">mdi-food-off</v-icon>
        <p class="grey--text mt-2 mb-0">No menu items available yet.</p>
      </div>

      <div v-else>
        <div v-for="(items, category) in grouped" :key="category" class="mb-4">
          <!-- Category Header -->
          <div class="d-flex align-center mb-3 mt-4">
            <v-chip x-small color="accent" dark class="mr-2 font-weight-bold text-uppercase" style="letter-spacing:0.8px; font-size:0.68rem;">
              {{ category }}
            </v-chip>
            <v-divider />
          </div>

          <!-- Items -->
          <div v-for="item in items" :key="item._id">
            <v-row no-gutters class="py-3" style="border-bottom:1px solid #F0EDE8;">
              <v-col>
                <div class="d-flex align-center flex-wrap mb-1">
                  <span class="item-name mr-2">{{ item.item_name }}</span>
                  <v-chip
                    v-if="!item.is_available"
                    x-small color="error" outlined
                    class="font-weight-medium" style="font-size:0.68rem;"
                  >
                    Unavailable
                  </v-chip>
                </div>

                <p v-if="item.description" class="grey--text mb-1" style="font-size:0.82rem; line-height:1.4;">
                  {{ item.description }}
                </p>

                <div class="d-flex align-center flex-wrap" style="gap:4px;">
                  <v-chip v-if="item.is_vegan" x-small color="success" outlined class="font-weight-semibold" style="font-size:0.68rem;">Vegan</v-chip>
                  <v-chip v-else-if="item.is_vegetarian" x-small color="green lighten-2" outlined class="font-weight-semibold" style="font-size:0.68rem;">Vegetarian</v-chip>
                  <v-chip v-if="item.is_gluten_free" x-small outlined color="orange darken-1" class="font-weight-semibold" style="font-size:0.68rem;">GF</v-chip>
                  <span v-if="item.preparation_time" class="grey--text" style="font-size:0.72rem;">~{{ item.preparation_time }}min</span>
                </div>
              </v-col>

              <v-col cols="auto" class="d-flex align-start pl-4">
                <span class="item-price">rs.{{ item.price.toFixed(2) }}</span>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'MenuSection',
  props: {
    grouped: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.item-name {
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  font-size: 0.95rem;
  color: #1C1C1E;
}
.item-price {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #8B5A2B;
}
</style>
