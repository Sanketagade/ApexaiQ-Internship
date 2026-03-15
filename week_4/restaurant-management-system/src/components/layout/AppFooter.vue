<template>
  <v-footer color="primary" class="py-6">
    <v-container style="max-width:1280px">
      <v-row align="center">
        <v-col cols="12" md="6">
          <div class="d-flex align-center mb-2">
            <v-icon color="secondary" size="20" class="mr-2">mdi-silverware-fork-knife</v-icon>
            <span class="white--text font-weight-bold" style="font-family:'Playfair Display',serif; font-size:1.1rem;">
              Table<span class="secondary--text">Top</span>
            </span>
          </div>
          <p class="grey--text text--lighten-1 mb-0" style="font-size:0.82rem;">
            Discover the finest dining experiences in your city.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-right">
          <span class="grey--text text--lighten-1" style="font-size:0.8rem;">
            © {{ year }} TableTop Restaurant Management System
          </span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    year() { return new Date().getFullYear() }
  }
}
</script>
