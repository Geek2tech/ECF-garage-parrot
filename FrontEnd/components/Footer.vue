<template>
    <footer
        class="fixed bottom-0 z-20 w-full  p-4 bg-white border-t border-gray-200 shadow md:flex-row md:items-center
       md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600  ">
      <div class="text-center m-5 text-2xl lg:text-4xl">Nous contacter</div>

        <div class="flex justify-center " >
          <PhoneCall/>
          <span class="px-3 text-lg"> 06.66.66.66.66</span>
          <ClipboardType/>
          <span class="px-3 text-lg"> Remplir le formulaire de contact</span>
      </div>


      <div class="text-center m-5 text-2xl lg:text-4xl"> Nos horaires d'ouvertures</div>

      <div class="  md:flex  xl:text-lg justify-evenly">

        <div v-for="opening in openingHoursValue" class="flex-col  md:text-base lg:text-xl flex-wrap m-5 ">
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



</template>

<script setup lang="js">
import {PhoneCall} from 'lucide-vue-next'
import {ClipboardType} from 'lucide-vue-next'
import request from '../helpers/request.js'

const openingHours =await request.getRequest('/api/openinghours','OpeningHours','GET')
const openingHoursValue = await openingHours.result._rawValue?.results

</script>



<style scoped>
footer {
  background-color: #262526;
  color: #F2F2F2;
  font-family: Barlow-regular, sans-serif;
}
</style>