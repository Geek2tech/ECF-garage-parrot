<script setup lang="ts">
defineProps({
  opening:Object
})


</script>

<template>


  <div class="  flex flex-col   md:flex-row xl:text-lg justify-evenly">

    <div class="flex-col   md:text-xl lg:text-2xl flex-wrap m-5 ">
      <div class="text-center ">
        {{ opening.day}}
      </div>
      <div class="text-center">
        {{ opening.morning }}
      </div>
      <div class="text-center">
        {{ opening.afternoon }}


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>