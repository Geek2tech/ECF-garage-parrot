<script setup lang="ts">
import {useCarStore} from "~/stores/carsStore";

const route = useRoute()
console.log(route.params)
const carStore = useCarStore()

carStore.getCars(route.params.id)
console.log(carStore.carList.results)

</script>

<template>
Page de détails
  {{ $route.params.id }}
  {{ carStore.carList.constructor_name}}

</template>

<style scoped>

</style>