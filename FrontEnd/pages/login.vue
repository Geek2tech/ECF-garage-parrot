<script setup lang="js">

import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";
const runTimeConfigs = useRuntimeConfig()


const userStore = useUserStore(pinia())

await userStore.login('demuylder.herve@gmail.com','test')


if (process.server){

  console.log("process server")
  const token =  useCookie('token')
   console.log('twt',token)
  userStore.jwt = token._rawValue
  console.log('store',userStore.jwt)

    console.log('Process Server')
    const {$verifyJwtToken} = useNuxtApp()
    const validToken = $verifyJwtToken(userStore.jwt,runTimeConfigs.JWT_SECRET)
    console.log('validToken',validToken)
    userStore.role = validToken.profil




}
if (process.client) {
  console.log("process client")


}



//const token =  useCookie('token')
//console.log('twt',token)
//userStore.jwt = token._rawValue
//const jwt =  useCookie('token')
//console.log('twt',jwt._value)


</script>


<template>
  <div>Login page</div>
<nuxt-link to="/admin">admin</nuxt-link>

    <div>
      <div>Info user</div>
      {{userStore.firstName}} - {{userStore.lastName}}
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