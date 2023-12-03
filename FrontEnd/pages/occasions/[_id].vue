<script setup lang="js">
import {useCarStore} from "~/stores/carsStore";
import {useConstactStore} from "~/stores/contactFormsStore.js";
import pinia from "~/stores/index.ts";

const contactStore = useConstactStore()
  definePageMeta({
  title: 'Garage Vincent Parrot',
  description: 'Garage Vincent Parrot',
  validate: async(route) => {
   return !(isNaN(route.params._id))

 }

})

const route = useRoute()

// init data
const carStore = useCarStore(pinia())
const runTimeConfigs = useRuntimeConfig()

await carStore.getCarEquipement(route.params._id)
await carStore.getCarPhotos(route.params._id)
carStore.activePage=1
await carStore.getCars(route.params.id)
if (carStore.carList.rows === 0) navigateTo({path:"/"})
// Set url to get photos
const urlPhotos=`${runTimeConfigs.public.API_URL}/photo/`

//modal
const modalActive = ref(false)
const stateForm = ref({
  mail: undefined,
  message: undefined,


})
function toggleModal (){
  modalActive.value === true ? modalActive.value =false : modalActive.value  = true

}
function submitMail(mail,message){
  const validateEmail = (mail) => {
    return mail.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const emailValidation = validateEmail(mail)

  if (!mail || !message ) {
    alert('Merci de remplir tout les champs')

    return
  }
  if (emailValidation === null ){
    alert('Votre email ne semble pas correct')
    return;
  }
  const subject = `demande d'information pour l'annonce n° ${carStore.carList.results[0].car_id}`

  const newMessage = `demande de la part de ${mail}
   - ${message}`

  contactStore.sendMail(subject,newMessage)

  toggleModal()
}
const focusedPhoto = ref(
    urlPhotos + carStore.carList.results[0]?.photo_name
)
function changePhoto(name) {
    focusedPhoto.value=urlPhotos + name
}



</script>
<script lang="js">


</script>
<template>

<section id="carDetails" class="=container lg:w-[1200px]  p-5 m-auto">



  <h1 class="text-center  text-3xl lg:text-5xl">{{ carStore.carList.results[0]?.constructor_name}} - {{carStore.carList.results[0]?.model_name}} - {{carStore.carList.results[0]?.circulation_year}} </h1>
  <h2 class="text-center text-2xl lg:text-4xl"> {{carStore.carList.results[0]?.color}} - {{carStore.carList.results[0]?.doors}} portes  </h2>
  <h2 class="text-center text-2xl  lg:text-4xl">{{carStore.carList.results[0]?.mileage}} Km  -  {{carStore.carList.results[0]?.price}} €</h2>




  <img crossorigin="anonymous" :src="focusedPhoto" alt="photo" class="object-cover mb-3 m-auto lg:max-w-[1000px] rounded-xl " >
  <div v-if="carStore.photoList.rows !== 0" class=" flex flex-wrap  align-middle justify-center   ">
     <div class="w-1/2 md:w-1/3   m-auto  ">
      <img crossorigin="anonymous" :src="urlPhotos + carStore.carList.results[0]?.photo_name" alt="primaryPhoto" @click="changePhoto(carStore.carList.results[0]?.photo_name)" class= " p-1 rounded-xl ">
    </div>
    
    <div v-for="photo in carStore.photoList.results" class= "  w-1/2 md:w-1/3  p-3 m-auto  ">
      <img crossorigin="anonymous" :src="urlPhotos + photo.photo_name" alt="carPhoto" @click="changePhoto(photo.photo_name)" class="rounded-xl">

    </div>
  </div>
<div class="  md:justify-evenly md:flex">
  <section id="motor" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class=" text-center font-bold text-[#D92332] text-4xl mb-3 lg:text-5xl">Motorisation</h2>
    <ul class="list-disc list-inside text-xl lg:text-2xl">
      <li>
        Puissance : {{carStore.carList.results[0]?.horse_power}} cv
      </li>
      <li>
        Puissance Fiscal : {{carStore.carList.results[0]?.fiscal_power}}
      </li>
      <li>
        cylindrée : {{carStore.carList.results[0]?.cylinder_capacity}} cm3
      </li>
      <li>
        Type motorisation : {{carStore.carList.results[0]?.motor_type}}
      </li>
      <li>
        Carburant : {{carStore.carList.results[0]?.fuel_name}}
      </li>
    </ul>


  </section>
  <section id="transmission" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class="font-bold text-center text-[#D92332] text-4xl mb-3 lg:text-5xl">Transmission</h2>

    <ul class="list-disc list-inside text-xl lg:text-2xl">
      <li>
        Type de boite : {{carStore.carList.results[0]?.transmission_type_name}}
      </li>

      <li>
        Type de transmission : {{carStore.carList.results[0]?.mode_name}}
      </li>

    </ul>


  </section>
  <section id="equipements" class="border-b-2 border-gray-400 md:border-none mt-1">
    <h2 class="font-bold text-center text-4xl lg:text-5xl mb-3 text-[#D92332] ">Equipements</h2>
    <div v-if="carStore.equipementList.rows === 0" class="text-xl" >
      <ul class="list-disc list-inside text-xl lg:text-2xl">
        <li>
          Pas d'équipements particulier
        </li>
      </ul>

    </div>

    <ul v-for="equipement in carStore.equipementList.results" class="text-xl lg:text-2xl list-disc list-inside">
<li>
  {{equipement.equipement_name}}
</li>


    </ul>
  </section>

</div>
</section>


  <UButton
      size="xl"
      icon="i-heroicons-pencil-square"
      label="Demander plus d'information"
      color="red"
      variant="outline"
      :onclick="toggleModal"
      block

      :ui="{
    rounded: 'rounded-full',

     }"
      class="mb-4"
  />

<!--- Modal --->

  <UModal v-model="modalActive">

    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Merci de remplir les champs suivants
      </template>

      <UForm
          :state="stateForm"

      >
        <UFormGroup  label="Votre adresse email" name="mail"  help="Entrez votre email" class="mb-4">
          <UInput type="email" v-model="stateForm.mail" autofocus/>
        </UFormGroup>
        <UFormGroup label="Votre Message" name="message" help="Entrez votre message n'hésitez pas à nous laisser un numéro de téléphone" class="mb-4">
          <UTextarea v-model="stateForm.message"/>

        </UFormGroup>
      </UForm>

      <template #footer class="flex text-center">
        <UButton
            label="Envoyer"
            type="submit"
            @click="submitMail(stateForm.mail,stateForm.message)"
        >

        </UButton>

      </template>
    </UCard>

  </UModal>


</template>

<style scoped>
div {
  font-family: Barlow,sans-serif;
}
</style>
