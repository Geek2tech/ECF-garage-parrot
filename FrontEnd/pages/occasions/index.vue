<script setup lang="js">
import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";
import CommentComponent from "~/components/CommentComponent.vue";

// management of filter
const carStore = useCarStore(pinia())
await carStore.getMinMax()
// management of carList
await carStore.getCars("noselect", '', '', '', '10')


function refresh(event) {


  if (event.target.innerText === ">") {

    if (carStore.activePage < carStore.nbPage) {
      carStore.activePageIncrement()


      carStore.getCars("all", carStore.priceFilter, carStore.yearFilter, carStore.mileageFilter, 10)
    }

  } else {

    if (carStore.activePage > 1) {
      carStore.activePageDecrement()

      carStore.getCars("all", carStore.priceFilter, carStore.yearFilter, carStore.mileageFilter, 10)
    }
  }
}


</script>

<template>
  <div>
    <Head>
      <Title> V.parrot - occasions</Title>
    </Head>
  </div>
  <section id="filters">
    <h1 class="text-6xl text-center m-3">Nos véhicules d'occasions</h1>


    <div class=" text-center flex  flex-wrap md:justify-around lg:justify-center justify-center">


      <FilterRangeComponent :min-max="carStore.minMaxYear" name="yearFilter" title="Année minimum" class="w-[250px]"/>

      <FilterRangeComponent :min-max="carStore.minMaxMileage" name="mileageFilter" title="Kilométrage maximum"
                            class="w-[250px]"/>

      <FilterRangeComponent :min-max="carStore.minMaxPrice" name="priceFilter" title="Prix maximum" class="w-[250px]"/>

    </div>
    <div class="border-b-2 border-[#D92332]"></div>


    <section id="carList" class="flex flex-wrap justify-center ">

      <CarsComponent v-for="carData in carStore.carList?.results" :car="carData"/>


    </section>
    <div class="flex justify-center mb-6">
      <UButton
          label='<'
          color="red"
          variant="outline"
          size="xl"
          :onClick="refresh"
          class="m-1 "

      />
      <UButton
          label='>'
          color="red"
          variant="outline"
          size="xl"
          :onClick="refresh"
          class="m-1"
      />
    </div>
  </section>

</template>

<style scoped>

</style>