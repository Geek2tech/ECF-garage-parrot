<script setup lang="js">




const apiKey = process.env.APP_APIKEY

const {pending,error,data: openingHours} = useAsyncData('opening',() => {

  return $fetch('http://localhost:8081/api/openinghours', {
        method: "GET",
        mode: "cors",
        headers: {
          "content-Type": "application/json",
          "x-api-key": `${apiKey}`
        },
    lazy:true,
    suspense:false,


      }
  )
})
const openingHoursValue = await openingHours._rawValue?.results

openingHoursValue?.forEach((opening) => {
  if (opening.morning.indexOf("-") === -1 && opening.afternoon.indexOf("-") === -1){
    const idToSupress = opening.opening_id -1
    openingHoursValue.splice(idToSupress,idToSupress)

  }
})

</script>

<template>
  <div v-if="pending" >
    <footer
        class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex-row md:items-center
       md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600  ">
      <p class="text-center">Chargement des informations</p>
    </footer>
  </div>
  <div v-else-if="error">
    <footer
        class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex-row md:items-center
       md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600  ">
    <p class="text-center">Erreur de chargement des informations</p>
      <p class="text-center">Contactez nous pour prendre rendez vous</p>
    </footer>
  </div>
<div v-else>
  <footer
      class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex-row md:items-center
       md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600  ">

    <div class="text-center m-5 text-2xl lg:text-4xl"> Nos horaires d'ouvertures</div>


    <div class="   md:flex  xl:text-lg justify-evenly">

      <div  v-for="opening in openingHoursValue" class="flex-col text-sm md:text-base lg:text-xl flex-wrap m-5 ">
        <div class="text-center">
          {{ opening.day }}
        </div>
        <div class="text-center">
            {{ opening.morning }}
        </div>
        <div class="text-center">
           {{ opening.afternoon }}
        </div>
      </div>
    </div>






  </footer>

</div>


</template>

<style scoped>
footer {
  background-color: #262526;
  color:#F2F2F2
}
</style>