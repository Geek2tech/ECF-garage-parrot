<template>
  <Header/>

  <NuxtPage/>



  <Footer/>

</template>

<script setup lang="ts">

import Header from "~/components/HeaderComponent.vue";
import Footer from "~/components/FooterComponent.vue";
useSeoMeta({
  description: 'Garage Vincent Parrot',
  ogTitle: 'Garage Vincent Parrot',
  ogDescription: 'réparation et vente de véhicules toutes marques',
  ogImage: '/logo_og.png',
  ogUrl: 'https://www.vparrot.fr',
  twitterTitle: 'Garage Vincent Parrot',
  twitterDescription: 'réparation et entretien de véhicules toutes marques',
  twitterImage: '/logo_twitter.png',
  twitterCard: 'summary'
})

useHead({
  htmlAttrs: {
    lang: 'fr'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo.png'
    }
  ]
})
</script>

<style>

@font-face {
  font-family: "Barlow-regular";
  src: url('./fonts/Barlow/Barlow-Regular.ttf');
}

@font-face {
  font-family: "Rajdhani";
  src: url("./fonts/Rajdhani/Rajdhani-Regular.ttf");
}

h1 {
  font-family: Rajdhani, sans-serif;

}

h2 {
  font-family: Rajdhani, sans-serif;
}

p {
  font-family: Barlow-regular, sans-serif;

}


</style>
