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



  <FilterRangeComponent :min-max="carStore.minMaxYear" name="minMaxYear" title="Année minimum"/>

  <FilterRangeComponent :min-max="carStore.minMaxMileage" name="minMaxMileage" title="Kilométrage maximum"/>

 <FilterRangeComponent :min-max="carStore.minMaxPrice" name="minMaxPrice" title="Prix maximum"/>





  </section>

</template>

<style scoped>

</style>