<script setup lang="js">


</script>
<script lang="js">

import {useCarStore} from "~/stores/carsStore.js";
import pinia from "~/stores/index.ts";

export default {
  data() {
    return {
      value: ref(0),

    }
  },
  props: {
    minMax: Object,
    name: String,
    title: String
  },
  methods: {
    storeValue() {

      const storage = `carStore.${this.name}=${this.value}`

      eval(storage)
      if (!carStore.yearFilter) {
        carStore.yearFilter = carStore.minMaxYear.min
      }
      if (!carStore.mileageFilter) {
        carStore.mileageFilter = carStore.minMaxMileage.max
      }
      if (!carStore.priceFilter) {
        carStore.priceFilter = carStore.minMaxPrice.max
      }

      carStore.getCars("all", carStore.priceFilter, carStore.yearFilter, carStore.mileageFilter)

    },
    setMax() {
      this.value = minMax.max
    }
  }

}
const carStore = useCarStore(pinia())


</script>
<template>
  <div class="m-3">
    <h1>{{ title }}</h1>
    <p class="text-center">{{ value }}</p>
    <URange :onChange="storeValue" :step="1" size="md" color="red" :name="title" placeholder="name" :min="minMax.min"
            :max="minMax.max" v-model="value"/>


  </div>


</template>

<style scoped>

</style>