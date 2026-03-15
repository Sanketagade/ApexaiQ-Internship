<template>
  <v-sheet elevation="0" color="white" class="py-3 px-0" style="border-bottom:1px solid #E8E3D9;">
    <v-container style="max-width:1280px;">
      <v-row align="center" no-gutters>
        <v-col cols="12" sm="auto" class="mr-3 mb-2 mb-sm-0">
          <span class="caption grey--text font-weight-bold text-uppercase" style="letter-spacing:1px;">Filter</span>
        </v-col>

        <!-- Rating Filter -->
        <v-col cols="12" sm="auto" class="mr-4 mb-2 mb-sm-0">
          <v-chip-group
            :value="ratingFilter"
            mandatory
            active-class="primary white--text"
            @change="$emit('update:ratingFilter', $event)"
          >
            <v-chip
              v-for="f in ratingFilters"
              :key="f.value"
              :value="f.value"
              small
              outlined
              class="font-weight-medium"
              style="font-size:0.8rem;"
            >
              {{ f.label }}
            </v-chip>
          </v-chip-group>
        </v-col>

        <v-divider vertical class="mx-2 d-none d-sm-block" style="height:24px;" />

        <!-- Cuisine Filter -->
        <v-col cols="12" sm="auto" class="mb-2 mb-sm-0">
          <v-chip-group
            :value="cuisineFilter"
            mandatory
            active-class="primary white--text"
            @change="$emit('update:cuisineFilter', $event)"
          >
            <v-chip
              v-for="c in cuisines"
              :key="c"
              :value="c"
              small
              outlined
              class="font-weight-medium"
              style="font-size:0.8rem;"
            >
              {{ c }}
            </v-chip>
          </v-chip-group>
        </v-col>

        <v-spacer />

        <!-- Clear btn -->
        <v-col cols="auto">
          <v-btn
            v-if="hasActiveFilters"
            text
            small
            color="accent"
            class="text-none font-weight-medium"
            @click="$emit('clear')"
          >
            <v-icon small left>mdi-close-circle</v-icon>
            Clear
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
export default {
  name: 'RestaurantFilters',
  props: {
    ratingFilter: { type: Number, default: 0 },
    cuisineFilter: { type: String, default: 'All' }
  },
  data() {
    return {
      ratingFilters: [
        { label: 'All Ratings', value: 0 },
        { label: '4.5+ ⭐', value: 4.5 },
        { label: '4.0+', value: 4.0 },
        { label: '3.5+', value: 3.5 }
      ],
      cuisines: ['All', 'American', 'Japanese', 'Mexican', 'Italian', 'Indian', 'French']
    }
  },
  computed: {
    hasActiveFilters() {
      return this.ratingFilter > 0 || this.cuisineFilter !== 'All'
    }
  }
}
</script>
