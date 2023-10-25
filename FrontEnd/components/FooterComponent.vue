<template>
    <footer
        class=" bottom-0 z-20 w-full  p-4 bg-white border-t border-gray-200 shadow md:flex-row md:items-center
       md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600  ">
      <div class="text-center m-5 text-2xl lg:text-4xl">Nous contacter</div>

        <div class="flex justify-center " >
          <PhoneCall/>
          <span class="px-3 text-lg"> 06.66.66.66.66</span>
          <ClipboardType/>
          <button  type=button :onClick="toggleModal" class=" hover:text-[#D9777F]  px-3 text-lg"> Remplir le formulaire de contact</button>
      </div>


      <div class="text-center m-5 text-2xl lg:text-4xl"> Nos horaires d'ouvertures</div>

      <div class="  flex flex-col   md:flex-row xl:text-lg justify-evenly">

        <div v-for="opening in openingHoursValue" class="flex-col   md:text-base lg:text-xl flex-wrap m-5 ">
          <div class="text-center ">
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
      <ContactFormsComponent v-model="contactStore.ModalActive"/>
    </footer>



</template>

<script setup lang="js">
import {PhoneCall} from 'lucide-vue-next'
import {ClipboardType} from 'lucide-vue-next'
import pinia from "~/stores/index.ts";
import {useConstactStore} from "~/stores/contactFormsStore.js";
import ContactFormsComponent from "~/components/ContactFormsComponent.vue";
const runTimeConfigs = useRuntimeConfig()


const {error,data: openingHours} = useAsyncData(`OpeningHours`,() => {
  return $fetch(`${runTimeConfigs.public.API_URL}/api/openinghours`, {
        method: `GET`,
        mode: "cors",
        headers: {
          "content-Type": "application/json",
          "x-api-key": `${runTimeConfigs.public.API_KEY}`
        },
        lazy: true,
        suspense: false,


      }
  )

})

const openingHoursValue = await openingHours._rawValue?.results
// management of contact forms

const contactStore = useConstactStore(pinia())

function toggleModal() {
  contactStore.toggleModal()
}

</script>



<style scoped>
footer {
  background-color: #262526;
  color: #F2F2F2;
  font-family: Barlow-regular, sans-serif;
}
</style>