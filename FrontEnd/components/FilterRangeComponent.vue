<script setup lang="js">




</script>
<script lang="js">
import {stringify} from "devalue";

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


    },
    setMax(){
      this.value = minMax.max
    }
  }

}


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