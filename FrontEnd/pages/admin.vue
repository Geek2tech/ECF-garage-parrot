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

</script>

<template>
<h1>Admin page</h1>
  <p>Bonjour - {{userStore.firstName}}   {{userStore.lastName}}</p>
  <div v-if="userStore.role==='administrateur'">administrateur</div>
  <div v-else >Utilisateur</div>

</template>

<style scoped>

</style>