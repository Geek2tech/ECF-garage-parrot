<script setup lang="js">
import {suppressSpecialChar} from "~/helpers/fieldControl";
import {useServicesStore} from "~/stores/servicesStore.js";
import pinia from "../stores/index.ts";
import {useCommentStore} from "~/stores/commentStore.js";
const commentStore = useCommentStore(pinia())



const stateForm = ref({
  nom: undefined,
  comment: undefined,
  note: undefined
})


async function submitComment(nom, comment, note) {

  if (!nom || !comment || !note) {
    alert('Merci de remplir tout les champs')

    return
  }
  if (comment.length > 90) {
    alert('Malheureusement le commentaire ne doit pas dépasser 80 caractères merci de le raccourcir')
    return
  }
  commentStore.addComment(suppressSpecialChar(nom), suppressSpecialChar(comment), suppressSpecialChar(note))
  //commentModal.value = false

  commentStore.loadComment()
  commentStore.toggleModal()



  alert(' Merci ! Votre commentaire est bien enregistré , il apparaitra bientôt sur le site')
}

const commentMax = ref(false)
const infoMaxChar = ref('')

function checkLength(event) {
  const commentLimit = 82

  if (event.target.value.length >= commentLimit + 1) {
    commentMax.value = true
    infoMaxChar.value = 'Commentaires trop grand. Merci de le réduire'
  } else {
    commentMax.value = false
    infoMaxChar.value = ` il vous reste =>  ${commentLimit - event.target.value.length} caratères`
  }
}

</script>

<template>
  <UModal v-model="commentModal">

    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        Merci de remplir les champs suivants
      </template>

      <UForm
          :state="stateForm"
      >
        <UFormGroup label="Votre Nom" name="nom" class="mb-4">
          <UInput v-model="stateForm.nom" autofocus/>
        </UFormGroup>
        <UFormGroup label="Votre commentaire" name="comment" class="mb-4">
          <UTextarea v-model="stateForm.comment" v-on:input="checkLength"/>
          <p :class="{help:true,'text-[#D92332]':commentMax===true}">{{ infoMaxChar }}</p>
        </UFormGroup>
        <UFormGroup label="Votre note" name="note">
          <USelect
              v-model="stateForm.note"
              variant="outline"
              name="select"
              :options="['1','2','3','4','5']"
          >
          </USelect>
        </UFormGroup>
      </UForm>

      <template #footer class="flex text-center">
        <UButton
            label="Envoyer"
            type="submit"
            @click="submitComment(stateForm.nom,stateForm.comment,stateForm.note)"
        >

        </UButton>

      </template>
    </UCard>

  </UModal>
</template>

<style scoped>

</style>