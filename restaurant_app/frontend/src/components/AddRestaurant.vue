<template>

<v-card class="pa-4">

<v-text-field
label="Name"
v-model="name"
></v-text-field>

<v-text-field
label="Location"
v-model="location"
></v-text-field>

<v-text-field
label="Rating"
v-model="rating"
></v-text-field>

<v-text-field
label="Foods (comma separated)"
v-model="foods"
></v-text-field>

<v-text-field
label="Image URL"
v-model="image"
></v-text-field>

<v-btn
color="primary"
@click="addRestaurant"
>

Add

</v-btn>

</v-card>

</template>

<script>

import axios from "axios"

export default{

data(){

return{

name:"",
location:"",
rating:"",
foods:"",
image:""

}

},

methods:{

addRestaurant(){

axios.post("http://localhost:3000/restaurants",{

name:this.name,
location:this.location,
rating:this.rating,
image:this.image,
foods:this.foods.split(",")

})

.then(()=>{

alert("Restaurant Added")

location.reload()

})

}

}

}

</script>