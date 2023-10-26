<script setup lang="js">




</script>
<script lang="js">

import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";

export default  {
  data(){
    return{
value: ref(),

    }
  },
  props:{
    minMax:Object,
    name: String,
    title:String
  },
  methods:{
    storeValue(){
      console.log(this.value)
      console.log(this.name)
      const storage = `carStore.${this.name}=${this.value}`
      console.log(storage)
      eval(storage)
      console.log(carStore.priceFilter)
      console.log(carStore.yearFilter)
      console.log(carStore.mileageFilter)
carStore.getCars("noselect",carStore.priceFilter)

    },
    setMax(){
      this.value = minMax.max
    }
  }

}
const carStore = useCarStore(pinia())


</script>
<template>
  <div class="m-3">
    <h1>{{title}}</h1>
    <p class="text-center">{{value}}</p>
   <URange  :onChange="storeValue"  :step="1"  size="md" color="red" :name="title" placeholder="name" :min="minMax.min" :max="minMax.max" v-model="value"/>


  </div>


</template>

<style scoped>

</style>