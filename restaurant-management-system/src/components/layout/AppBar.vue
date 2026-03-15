<template>
  <v-app-bar app color="primary" elevation="0" height="64">
    <v-container class="d-flex align-center pa-0" style="max-width:1280px">
      <router-link to="/" class="text-decoration-none d-flex align-center">
        <v-icon color="secondary" size="28" class="mr-2">mdi-silverware-fork-knife</v-icon>
        <span class="brand-name white--text">
          Table<span class="secondary--text">Top</span>
        </span>
      </router-link>

      <v-spacer />

      <v-btn
        v-if="$route.name !== 'home'"
        text
        color="white"
        class="text-none font-weight-medium mr-2"
        @click="$router.push('/')"
      >
        <v-icon left small>mdi-arrow-left</v-icon>
        All Restaurants
      </v-btn>

      <v-btn
        outlined
        color="secondary"
        class="text-none font-weight-semibold"
        small
        @click="$router.push('/admin')"
      >
        <v-icon left small>mdi-shield-account</v-icon>
        Admin
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>

<style scoped>
.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}
</style>
