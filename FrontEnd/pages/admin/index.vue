<script setup lang="js">


import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";



definePageMeta({
  middleware: 'auth',

})
// store declaration

const userStore = await useUserStore(pinia())

userStore.isAuth ?  null : navigateTo('/login')

// init const for fetch

const xsrfToken =  sessionStorage.getItem("xsrf")



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
  <h1 class="text-center text-4xl font-light  ">Administration du site</h1>
  <div class="p-2 text-2xl ">Bonjour - {{ userStore.firstName }} {{ userStore.lastName }}</div>
  <UButton
    label="Déconnexion"
    color="red"
    class="m-3"
    @click="userStore.logout()"
    />

  <div class="grid grid-cols-5 grid-rows-5 gap-4 mb-4">
    <div class="col-span-2 row-span-5 border-2 ">
      <UVerticalNavigation :links="links" >

        <template #default="{ link }">
          <span class="group-hover:text-[#D92332] text-xl relative">{{ link.label }}</span>
        </template>
      </UVerticalNavigation>
    </div>
    <div class="col-span-3 row-span-5 col-start-3">
      <div class="mb-3 text-lg font-semibold"> {{ compoToSet }}</div>

      <admin-pending-comments-component
          v-if="compoToSet==='Commentaires à valider'"

          :token="xsrfToken"
      />
      <admin-equipements-component
          v-if="compoToSet==='Gestion des équipements'"
          :token="xsrfToken"

      />
      <admin-fuel-component
          v-if="compoToSet === 'Gestion des carburants'"
          :token="xsrfToken"

      />
      <admin-service-component
        v-if="compoToSet === 'Gestion des services'"
        :token="xsrfToken"

        />
      <admin-opening-component
        v-if="compoToSet === 'Gestion des horaires'"
        :token="xsrfToken"

        />
      <admin-constructor-component
        v-if="compoToSet === 'Gestion des constructeurs'"
        :token="xsrfToken"

        />
      <admin-user-component
        v-if="compoToSet === 'Gestion des utilisateurs'"
        :token="xsrfToken"

        />
      <admin-cars-component
        v-if="compoToSet === 'Gestion des annonces'"
        :token="xsrfToken"

        />

    </div>
  </div>

</template>

<style scoped>

</style>
