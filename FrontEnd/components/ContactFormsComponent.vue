<script setup lang="js">
import {useConstactStore} from "~/stores/contactFormsStore.js";
import pinia from "~/stores/index.ts";
import {suppressSpecialChar} from "~/helpers/fieldControl.js";

const stateForm = ref({
  mail: undefined,
  message: undefined,


})
const contactStore = useConstactStore(pinia())
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
contactStore.sendMail(suppressSpecialChar(mail),suppressSpecialChar(message))
alert('Votre demande est bien enregistré')
  contactStore.toggleModal()
}
</script>

<template>
  <UModal >

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

</style>