<script setup lang="js">

defineProps({
  service : {}
})


</script>

<template>
<div class="m-5">
  <UCard
  :ui="{
    base: ' text-xl md:text-3xl text-center font-[Barlow] md:w-min-[500px] md:w-max-[700px] h-min-[250px] ]',
    divide: 'divide-y divide-[#D92332] dark:divide-white/50',
    background: 'bg-white/80 dark:bg-gray-700/70',
    header:{
      base:'text-[#D92332] text-2xl md:text-3xl font-extrabold  font-[Rajdhani]  h-1/4'
    },
    body:{
      base:'text-center  dark:text-[#F2F2F2]'
    }

  }"

  >
    <template #header>
      {{ service.service_name }}
    </template>

    {{ service.service_description }}

  </UCard>


</div>
</template>

<style scoped>

</style>