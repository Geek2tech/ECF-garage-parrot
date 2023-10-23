<template>
<Header/>
<NuxtPage />
 <Footer/>



</template>

<script setup lang="ts">

import Header from "~/components/HeaderComponent.vue";
import Footer from "~/components/FooterComponent.vue";
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
h1 {
  font-family: Rajdhani,sans-serif ;

}
h2 {
  font-family: Rajdhani,sans-serif;
}
p {
  font-family: Barlow-regular,sans-serif;

}


</style>