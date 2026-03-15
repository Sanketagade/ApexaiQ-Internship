<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    timeout="3500"
    bottom
    right
    elevation="4"
  >
    <div class="d-flex align-center">
      <v-icon left small>{{ snackbar.icon }}</v-icon>
      {{ snackbar.message }}
    </div>
    <template v-slot:action="{ attrs }">
      <v-btn text v-bind="attrs" small @click="close">Dismiss</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GlobalSnackbar',
  computed: {
    ...mapGetters(['snackbar'])
  },
  methods: {
    close() {
      this.$store.commit('SET_SNACKBAR', { ...this.snackbar, show: false })
    }
  }
}
</script>
