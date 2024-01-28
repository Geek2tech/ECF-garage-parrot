<script setup lang="js">

import {useUserStore} from "~/stores/userStore.js";



</script>
<script lang="js">
import {useUserStore} from "~/stores/userStore.js";
import pinia from "~/stores/index.ts";
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
      },
      modal:false
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

    },
    toggleModal : function () {
this.modal ? this.modal = false : this.modal=true

    },
    submitReset : async function (email) {
      await userStore.resetPassword(suppressSpecialChar(email))
      alert("Si votre compte existe un nouveau mot de passe vient de vous être envoyé")
      this.modal =false
    }
  }
}
const stateForm = ref({
email: undefined
})


</script>

<template>

  <div>
    <Head>
      <Title> V.parrot - Login</Title>
    </Head>
  </div>
  <section id="login"
      class="mx-auto flex min-h-screen w-full items-center justify-center bg-[url('/images/car-3504910_1920.jpg')] bg-cover text-white"
  >
    <!-- component -->
    <form  @submit.prevent="handleSubmit" class="flex w-[30rem] flex-col space-y-10">
      <div class="text-center text-4xl font-medium">Log In</div>

      <div
          class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#D92332]"
      >
        <input
            type="email"
            v-model="form.email"
            placeholder="Email"
            required
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            name="email"
        />
      </div>

      <div
          class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#D92332]"
      >
        <input
            type="password"
            v-model="form.password"
            placeholder="Mot de passe"
            required
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            name="password"
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
          :onclick="toggleModal"
      >Mot de passe oublié ?</a
      >


    </form>
  </section>
  <UModal v-model="modal" >

    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Merci de remplir l'adresse mail du compte ou le reset de mot de passe est souhaité
      </template>

      <UForm
          :state="stateForm"
      >
        <UFormGroup label="Votre email" name="email" class="mb-4">
          <UInput v-model="stateForm.email" autofocus/>
        </UFormGroup>

      </UForm>

      <template #footer class="flex text-center">
        <UButton
            label="Envoyer"
            type="submit"
            color="red"
            @click="submitReset(stateForm.email)"
        >

        </UButton>

      </template>
    </UCard>

  </UModal>
</template>

<style scoped>

</style>
