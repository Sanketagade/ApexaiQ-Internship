<template>

<v-app>

<v-app-bar color="primary" dark>

<v-toolbar-title>
Restaurant Finder
</v-toolbar-title>

</v-app-bar>

<v-container>

<AddRestaurant/>

<v-divider class="my-5"></v-divider>

<RestaurantList/>

</v-container>

</v-app>

</template>

<script>

import RestaurantList from "./components/RestaurantList.vue"
import AddRestaurant from "./components/AddRestaurant.vue"

export default{

components:{
RestaurantList,
AddRestaurant
}

}

</script>