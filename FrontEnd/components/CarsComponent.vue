<script setup lang="js">
const runTimeConfigs = useRuntimeConfig()
const props =defineProps({
  car : Object
})

// URl of photo
const url=`${runTimeConfigs.public.API_URL}/photo/`

function test(){
  alert(props.car.car_id)
}

</script>

<template>

<div  class=" cursor-pointer container border-b-2 lg:flex lg:justify-center lg:mt-2  " :onClick="test" >
  <div class="lg:w-1/3 justify-end">
    <img crossorigin="anonymous" :src="url+car.photo_name" :alt="car.model_name" class="rounded-3xl p-2 object-cover  ">
  </div>

  <div class="p-2 w-2/5">
    <h1 class="text-center lg:text-justify lg:text-4xl lg:p2 lg:mb-6 text-2xl"><strong>{{car.constructor_name}} {{car.model_name}}</strong>  </h1>
    <p class="lg:mb-4"> {{car.circulation_year}} - {{car.mileage}} km - {{ car.fuel_name}} - {{car.transmission_type_name}}</p>
    <p class="font-bold ">{{car.price}} €</p>
  </div>




</div>






</template>

<style scoped>
img {
  object-fit: fill;
}
</style>