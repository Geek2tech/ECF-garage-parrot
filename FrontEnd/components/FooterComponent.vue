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

      <div class="  flex flex-wrap  md:flex-row xl:text-lg justify-evenly">

<OpeningComponent v-for="openingHour in openingHoursStore.openingHours" :opening="openingHour"/>


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
import {useOpeningStore} from "~/stores/OpeningStore.js";
import OpeningComponent from "~/components/OpeningComponent.vue";






// management of opening hours
const openingHoursStore = useOpeningStore(pinia())
await openingHoursStore.getOpeningHours()
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