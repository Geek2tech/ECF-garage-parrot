<script setup lang="js">

import {useUserStore} from "~/stores/userStore.js";



</script>
<script lang="js">
import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";
import * as path from "path";
import {suppressSpecialChar} from "~/helpers/fieldControl.js";

const userStore = useUserStore(pinia())
const router = useRouter()
export default {
  name:"LoginForm",
  data(){
    return{
      form:{
        email:"",
        password:""
      }
    }
  },
  methods : {
    handleSubmit : async function () {

         await userStore.login(suppressSpecialChar(this.form.email),suppressSpecialChar(this.form.password))

      if(userStore.isAuth === false) {
        alert('email ou mot de passe incorrect')
        return
      }
       navigateTo('/admin')
    },
    resetPassword : async function (){

    }
  }
}

</script>

<template>


  <section id="login"
      class="mx-auto flex min-h-screen w-full items-center justify-center bg-[url('/images/car-3504910_1920.jpg')] bg-cover text-white"
  >
    <!-- component -->
    <form  @submit.prevent="handleSubmit" class="flex w-[30rem] flex-col space-y-10">
      <div class="text-center text-4xl font-medium">Log In</div>

      <div
          class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
      >
        <input
            type="email"
            v-model="form.email"
            placeholder="Email"
            required
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        />
      </div>

      <div
          class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
      >
        <input
            type="password"
            v-model="form.password"
            placeholder="Mot de passe"
            required
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
        />
      </div>

      <button
          class="transform rounded-sm bg-[#D92332] py-2 font-bold duration-300 hover:bg-indigo-400"
       type="submit">
     Se connecter
      </button>

      <a
          href="#"
          class="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
      >Mot de passe oublié ?</a
      >


    </form>
  </section>




</template>

<style scoped>

</style>