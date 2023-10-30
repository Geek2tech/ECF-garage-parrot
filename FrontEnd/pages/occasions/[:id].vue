<script setup lang="js">
import {useCarStore} from "~/stores/carsStore";

const route = useRoute()
// init data
const carStore = useCarStore()
const runTimeConfigs = useRuntimeConfig()
await carStore.getCars(route.params.id)
await carStore.getCarEquipement(route.params.id)
await carStore.getCarPhotos(route.params.id)



// Set url to get photos
const urlPHotos=`${runTimeConfigs.public.API_URL}/photo/`





</script>

<template>

<section id="carDetails" class="=container lg:w-[1200px]  p-5 m-auto">



  <h1 class="text-center  text-3xl lg:text-5xl">{{ carStore.carList.results[0]?.constructor_name}} - {{carStore.carList.results[0].model_name}} - {{carStore.carList.results[0].circulation_year}} </h1>
  <h2 class="text-center text-2xl lg:text-4xl"> {{carStore.carList.results[0].color}} - {{carStore.carList.results[0].doors}} portes  </h2>
  <h2 class="text-center text-2xl  lg:text-4xl">{{carStore.carList.results[0].mileage}} Km  -  {{carStore.carList.results[0].price}} €</h2>




  <img crossorigin="anonymous" :src="urlPHotos + carStore.carList.results[0]?.photo_name" alt="photo" class="object-cover mb-3">
  <div v-if="carStore.photoList.rows !== 0" class=" flex flex-wrap  align-middle justify-center   ">

    <div v-for="photo in carStore.photoList.results" class= "  w-1/2 md:w-1/3 p-3  ">
      <img crossorigin="anonymous" :src="urlPHotos + photo.photo_name" alt="">

    </div>
  </div>
<div class="  md:justify-evenly md:flex">
  <section id="motor" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class=" text-center font-bold text-[#D92332] text-4xl lg:text-5xl">Motorisation</h2>
    <ul class="list-disc list-inside text-xl lg:text-2xl">
      <li>
        Puissance : {{carStore.carList.results[0].horse_power}}
      </li>
      <li>
        Puissance Fiscal : {{carStore.carList.results[0].fiscal_power}} cv
      </li>
      <li>
        cylindrée : {{carStore.carList.results[0].cylinder_capacity}} cm3
      </li>
      <li>
        Type motorisation : {{carStore.carList.results[0].motor_type}}
      </li>
      <li>
        Carburant : {{carStore.carList.results[0].fuel_name}}
      </li>
    </ul>


  </section>
  <section id="transmission" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class="font-bold text-center text-[#D92332] text-4xl lg:text-5xl">Transmission</h2>

    <ul class="list-disc list-inside text-xl lg:text-2xl">
      <li>
        Type de boite : {{carStore.carList.results[0].transmission_type_name}}
      </li>

      <li>
        Type de transmission : {{carStore.carList.results[0].mode_name}}
      </li>

    </ul>


  </section>
  <section id="equipements" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class="font-bold text-center text-4xl lg:text-5xl text-[#D92332] ">Equipements</h2>
    <div v-if="carStore.equipementList.rows === 0" class="text-xl" >
      <ul class="list-disc list-inside text-xl lg:text-2xl">
        <li>
          Pas d'équipements particulier
        </li>
      </ul>

    </div>

    <ul v-for="equipement in carStore.equipementList.results" class="text-xl lg:text-2xl list-disc list-inside">
<li>
  {{equipement.equipement_name}}
</li>


    </ul>
  </section>

</div>
</section>
</template>

<style scoped>
div {
  font-family: Barlow;
}
</style>