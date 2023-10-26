<script setup lang="js">
import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";


const route = useRoute()

const carStore = useCarStore(pinia())
 const minmax = await carStore.getMinMax()
 carStore.setCarId('all')
carStore.setPriceFilter(carStore.maxPrice)
carStore.setYearFilter(carStore.minYear)

carStore.setMileageFilter(carStore.maxMileage)
console.log('maxmileage', carStore.maxMileage)
carStore.getCars()





</script>

<template>
  <div>
 ocassion
    <div>
     <p>




     </p>
    </div>

  </div>

</template>

<style scoped>

</style>