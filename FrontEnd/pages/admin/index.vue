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
  middleware: 'auth',

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
await profilStore.getProfils(xsrfToken)
await fuelStore.getFuels(xsrfToken)
await openingStore.getAllOpeningHours()
await carStore.getCars('noselect')
await towingStore.getTowing()
await serviceStore.loadServices()
await constructorStore.getConstructors()
await transmissionStore.getTransmissions()
await commentStore.getPendingComment(xsrfToken)
await equipementStore.getEquipements()
await userStore.getUser(xsrfToken)

const profils = profilStore.profilList.results

const links = [{
  label: 'Commentaires à valider',
  icon: 'i-heroicons-clipboard-document-check',

  click: setComponent

}, {
  label: 'Gestion des équipements',
  icon: 'i-heroicons-cpu-chip-20-solid',

  click: setComponent
},
  {
    label: 'Gestion des carburants',
    icon: 'i-heroicons-beaker',

    click: setComponent
  },
  {
    label: 'Gestion des constructeurs',
    icon: 'i-heroicons-truck',

    click: setComponent

  },
  {
    label: 'Gestion des annonces',
    icon: 'i-heroicons-document-text',

    click: setComponent

  },


]
// add links for administrator profil
if (userStore.role === "administrateur") {
  links.push({label: "Gestion des utilisateurs", icon: 'i-heroicons-users', click: setComponent})
  links.push({label: "Gestion des horaires", icon: 'i-heroicons-face-smile-20-solid', click: setComponent})
  links.push({label: "Gestion des services",icon:'i-heroicons-newspaper',click:setComponent})
}

const compoToSet = ref("Commentaires à valider")

function setComponent(event) {

  compoToSet.value = event.target.innerText

  // restart logout timer
  userStore.startSessionTimer()
}

</script>

<template>
  <div>
    <Head>
      <Title> Administration - V.parrot</Title>
    </Head>
  </div>
  <h1>Admin page</h1>
  <p class="m-auto  text-2xl  mb-3">Bonjour - {{ userStore.firstName }} {{ userStore.lastName }}</p>

  <div class="grid grid-cols-5 grid-rows-5 gap-4 mb-4">
    <div class="col-span-2 row-span-5 border-2 ">
      <UVerticalNavigation :links="links">

        <template #default="{ link }">
          <span class="group-hover:text-[#D92332] text-xl relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </div>
    <div class="col-span-3 row-span-5 col-start-3">
      {{ compoToSet }}

      <admin-pending-comments-component
          v-if="compoToSet==='Commentaires à valider'"
          :commentsList="commentStore?.pendingCommentList"
          :token="xsrfToken"
      />
      <admin-equipements-component
          v-if="compoToSet==='Gestion des équipements'"
          :token="xsrfToken"
          :equipementsList="equipementStore.equipementsList"
      />
      <admin-fuel-component
          v-if="compoToSet === 'Gestion des carburants'"
          :token="xsrfToken"
          :fuel-list="fuelStore.fuelList"
      />
      <admin-service-component
        v-if="compoToSet === 'Gestion des services'"
        :token="xsrfToken"
        :service-list="serviceStore.services"
        />
      <admin-opening-component
        v-if="compoToSet === 'Gestion des horaires'"
        :token="xsrfToken"
        :opening-list="openingStore.openingHours"
        />
      <admin-constructor-component
        v-if="compoToSet === 'Gestion des constructeurs'"
        :token="xsrfToken"
        :constructor-list="constructorStore.constructorsList"
        />
      <admin-user-component
        v-if="compoToSet === 'Gestion des utilisateurs'"
        :token="xsrfToken"
        :users-list="userStore.userList"
        :profil-list="profilStore.profilList"
        />
      <admin-cars-component
        v-if="compoToSet === 'Gestion des annonces'"
        :token="xsrfToken"
        :car-list="carStore.carList"
        />

    </div>
  </div>

</template>

<style scoped>

</style>