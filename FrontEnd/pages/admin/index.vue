<script setup lang="js">


import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";
import {useProfilStore} from "~/stores/profilStore.js";
import {useFuelStore} from "~/stores/fuelStore.js";
import {useOpeningStore} from "~/stores/OpeningStore.js";
import {useCarStore} from "~/stores/carsStore.js";
import {useTowingStore} from "~/stores/towingStore.js";
import {useServicesStore} from "~/stores/servicesStore.js";
import {useConstructorStore} from "~/stores/constructorStore.js";
import {useTransmissionStore} from "~/stores/transmissionStore.js";
import {useCommentStore} from "~/stores/commentStore.js";
import {useequipementStore} from "~/stores/equipementStore.js";


definePageMeta({
  middleware: 'auth'
})
// store declaration

const userStore = await useUserStore(pinia())
const profilStore = await useProfilStore(pinia())
const fuelStore = await useFuelStore(pinia())
const openingStore = await useOpeningStore(pinia())
const carStore = await useCarStore(pinia())
const towingStore = await useTowingStore(pinia())
const serviceStore = await useServicesStore(pinia())
const constructorStore = await useConstructorStore(pinia())
const transmissionStore = await useTransmissionStore(pinia())
const commentStore = await useCommentStore(pinia())
const equipementStore = await useequipementStore(pinia())
// init const for fetch

const xsrfToken = await sessionStorage.getItem("xsrf")


// fetch data
await  profilStore.getProfils(xsrfToken)
await fuelStore.getFuels(xsrfToken)
await openingStore.getOpeningHours()
await carStore.getCars('noselect')
await towingStore.getTowing()
await serviceStore.loadServices()
await constructorStore.getConstructors()
await transmissionStore.getTransmissions()
await commentStore.getPendingComment(xsrfToken)
await equipementStore.getEquipements()
await userStore.getUser(xsrfToken)


const links = [{
  label: 'Commentaires à valider',
  icon:'i-heroicons-clipboard-document-check',

  click:setComponent

}, {
  label: 'Gestions des équipements',
  icon:'i-heroicons-cpu-chip-20-solid',

  click:setComponent
},
  {
    label:'Gestion des carburants',
    icon:'i-heroicons-beaker',

    click:setComponent
  },
  {
    label:'Gestion des annonces',
    icon:'i-heroicons-document-text',

    click:setComponent

  },

  {
    label:'Gestions des services',
    icon:'i-heroicons-newspaper',
    click:setComponent
  },
]
// add links for administrator profil
if (userStore.role === "administrateur") {
  links.push({label:"Gestions des utilisateurs",icon:'i-heroicons-users', click:setComponent})
  links.push({label:"Gestions des horaires",icon:'i-heroicons-face-smile-20-solid',  click:setComponent})
}

const compoToSet = ref("Commentaires à valider")
 function setComponent(event){

  compoToSet.value =  event.target.innerText

   // restart logout timer
   userStore.startSessionTimer()
}

</script>

<template>
<h1>Admin page</h1>
  <p class="m-auto  text-2xl  mb-3">Bonjour - {{userStore.firstName}}   {{userStore.lastName}}</p>

  <div class="grid grid-cols-5 grid-rows-5 gap-4 mb-4">
    <div class="col-span-2 row-span-5 border-2 ">
      <UVerticalNavigation :links="links">

        <template #default="{ link }">
          <span class="group-hover:text-[#D92332] text-xl relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </div>
    <div class="col-span-3 row-span-5 col-start-3">
{{compoToSet}}

        <admin-pending-comments-component v-if="compoToSet==='Commentaires à valider'" :commentsList="commentStore.pendingCommentList" :token="xsrfToken" />
      <admin-equipements-component v-if="compoToSet==='Gestions des équipements'" :token="xsrfToken" :equipementsList="equipementStore.equipementsList"/>


    </div>
  </div>

</template>

<style scoped>

</style>