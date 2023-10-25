<script setup lang="ts">
import {useCarStore} from "~/stores/carsStore";
import pinia from "~/stores/index.ts";



const carStore = useCarStore(pinia())
 carStore.getMinMax()
const test = carStore.maxMileage
console.log(test)



</script>

<template>
  <div>
 ocassion
    <div>
     <p>

       {{carStore.minPrice}}
       {{carStore.minYear}}


     </p>
    </div>

  </div>

</template>

<style scoped>

</style>