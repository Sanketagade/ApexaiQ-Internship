<template>

<v-row>

<v-col
v-for="r in restaurants"
:key="r._id"
cols="12"
md="4"
>

<v-card>

<v-img
:src="r.image"
height="200"
></v-img>

<v-card-title>

{{r.name}}

</v-card-title>

<v-card-text>

📍 {{r.location}}

<br>

⭐ {{r.rating}}

<br>

Foods:

<span v-for="f in r.foods" :key="f">

{{f}},

</span>

</v-card-text>

</v-card>

</v-col>

</v-row>

</template>

<script>

import axios from "axios"

export default{

data(){

return{
restaurants:[]
}

},

mounted(){

axios.get("http://localhost:3000/restaurants")
.then(res=>{

this.restaurants=res.data

})

}

}

</script>