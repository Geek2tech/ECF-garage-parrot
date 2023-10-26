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
    name: String
  },
  methods:{
    test(){
      console.log(this.value)
    },
    setMax(){
      this.value = minMax.max
    }
  }

}


</script>
<template>
  <div class="m-3">
    <h1>{{name}}</h1>
   <URange  :onChange="test"  :step="1"  size="md" color="red" :name="name" placeholder="name" :min="minMax.min" :max="minMax.max" v-model="value"/>


  </div>


</template>

<style scoped>

</style>