<script setup lang="js">
import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";

// management of filter
const carStore = useCarStore(pinia())
carStore.getMinMax()
// management of carList
carStore.getCars("noselect")
// modify photo name to add backend url









</script>

<template>
  <section id="filters" >
<h1 class="text-6xl text-center m-3">Nos véhicules d'occasions</h1>


    <div class=" text-center flex  flex-wrap md:justify-around lg:justify-center justify-center">


      <FilterRangeComponent :min-max="carStore.minMaxYear" name="yearFilter" title="Année minimum" class="w-[250px]"/>

      <FilterRangeComponent :min-max="carStore.minMaxMileage" name="mileageFilter" title="Kilométrage maximum" class="w-[250px]"/>

      <FilterRangeComponent :min-max="carStore.minMaxPrice" name="priceFilter" title="Prix maximum" class="w-[250px]"/>

    </div>
    <div class="border-b-2 border-[#D92332]"></div>




<section id="carList" class="flex flex-wrap  ">

    <CarsComponent v-for="carData in carStore.carList?.results"  :car="carData"  />


</section>

  </section>

</template>

<style scoped>

</style>