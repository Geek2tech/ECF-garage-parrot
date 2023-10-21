<template>

  <Header/>

  <NuxtPage />

  <Footer/>

</template>

<script setup lang="ts">

import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
</script>

<style>

@font-face {
  font-family: "Barlow-regular";
  src: url('./fonts/Barlow/Barlow-Regular.ttf');
}
@font-face {
  font-family:"Rajdhani";
  src: url("./fonts/Rajdhani/Rajdhani-Regular.ttf");
}


</style>