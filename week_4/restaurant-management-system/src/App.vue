<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <AppBar />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
    <GlobalSnackbar />
  </v-app>
</template>

<script>
import AppBar from './components/layout/AppBar.vue'
import AppFooter from './components/layout/AppFooter.vue'
import GlobalSnackbar from './components/shared/GlobalSnackbar.vue'

export default {
  name: 'App',
  components: { AppBar, AppFooter, GlobalSnackbar }
}
</script>

<style>
* { box-sizing: border-box; }

body, html {
  font-family: 'DM Sans', sans-serif !important;
}

.section-title {
  font-family: 'Playfair Display', serif !important;
  font-weight: 600 !important;
  letter-spacing: -0.3px !important;
}

.playfair {
  font-family: 'Playfair Display', serif !important;
}

.v-application {
  font-family: 'DM Sans', sans-serif !important;
}
</style>
