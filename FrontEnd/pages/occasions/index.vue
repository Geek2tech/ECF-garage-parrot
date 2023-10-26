<script setup lang="js">

import {useCommentStore} from "~/stores/commentStore.js";

const route = useRoute()


import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";
const carStore = useCarStore(pinia())
carStore.getMinMax()


function test() {
  console.log(test)
}



</script>

<template>
  <section id="Cars" class="h-[800px]">
<h1>Nos véhicules d'occasions</h1>



  <FilterRangeComponent :min-max="carStore.minMaxYear" name="Filtrage sur l'année"/>

  <FilterRangeComponent :min-max="carStore.minMaxMileage" name="Filtrage sur le kilométrage"/>

 <FilterRangeComponent :min-max="carStore.minMaxPrice" name="Filtrage sur le prix"/>





  </section>

</template>

<style scoped>

</style>