<script setup lang="js">


import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";

definePageMeta({
  middleware: 'auth'
})
const userStore = await useUserStore(pinia())


const runTimeConfigs = useRuntimeConfig()

const {error, data: profils} = await useAsyncData('Profils', () => {
      return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/profils`, {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
              "content-Type": "application/json",
              "x-api-key": `${runTimeConfigs.public.API_KEY}`,
              "x-xsrf-token":`${userStore.xsrfToken}`
            },
            key: 'profils',




          }
      )

    }
)
console.log('profil',profils)


</script>

<template>
<h1>Admin page</h1>
  <div v-if="userStore.role==='administrateur'">administrateur</div>
  <div v-else >Utilisateur</div>
  <div>JWT</div>
  <div>{{userStore?.jwt}}</div>
  <div>XSRF</div>
  {{userStore?.xsrfToken}}
  <h1>Suite</h1>
  <div>{{profils?.results}}</div>
  <div>--------</div>
  <div>
    <div> XSRF</div>
    <div>
      {{userStore?.xsrfToken}}
    </div>
    <div>Auth</div>
    <div>
      {{userStore?.isAuth}}
    </div>
    <div>JWT</div>
    <div>
      {{userStore?.jwt}}
    </div>
    <div>ROLE</div>
    <div>
      {{userStore?.role}}
    </div>

  </div>
</template>

<style scoped>

</style>