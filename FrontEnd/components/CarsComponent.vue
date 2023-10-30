<script setup lang="js">
import {navigateTo} from "#app";

const runTimeConfigs = useRuntimeConfig()
const props =defineProps({
  car : Object
})

// URl of photo
const url=`${runTimeConfigs.public.API_URL}/photo/`

 function goDetails(event){
console.log(event.target.value)
 // console.log(event.target.attributes.value.value)
   event.target.value
//navigateTo({path:`/occasions/${event.target.attributes.value.value}`})
navigateTo({path:`/occasions/${event.target.value}`})

}

</script>

<template>

<div   class=" cursor-pointer container border-b-2 lg:flex lg:justify-center lg:mt-2 " :value="car.car_id"  >
  <div class="lg:w-1/3 justify-end">
    <img crossorigin="anonymous" :src="url+car.photo_name" :alt="car.model_name" class="rounded-3xl p-2 object-cover  ">
  </div>

  <div class="p-2 w-2/5">
    <h1 class=" font-bold lg:text-center lg:text-justify lg:text-4xl lg:p2 lg:mb-6 text-2xl"><strong>{{car.constructor_name}} {{car.model_name}}</strong>  </h1>
    <p class="lg:mb-4"> {{car.circulation_year}} - {{car.mileage}} km - {{ car.fuel_name}} - {{car.transmission_type_name}}</p>
    <p class="font-bold ">{{car.price}} €</p>
  </div>

  <UButton
      label="Voir le détail de l'annonce"
      color="red"
      :onClick="goDetails"
      :value="car.car_id"
      class="mb-4 lg:mb-0"
       />







</div>






</template>

<style scoped>
img {
  object-fit: fill;
}
</style>