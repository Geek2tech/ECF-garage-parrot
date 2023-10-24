<script setup lang="js">
import {useCommentStore} from "~/stores/comments.js";
import pinia from "~/stores/index.ts";
import CommentComponent from "~/components/CommentComponent.vue";
import PresentationComponent from "~/components/PresentationComponent.vue";
import { suppressSpecialChar } from '../helpers/fieldControl.js'

const route = useRoute()
const commentStore = useCommentStore(pinia())
const isOpen = ref(false)
commentStore.loadComment()

function refresh(event) {


  if (event.target.innerText === ">") {

    if (commentStore.activePage < commentStore.nbPage) {
      commentStore.activePageIncrement()
      commentStore.loadComment(parseInt(commentStore.activePage))
    }

  } else {

    if (commentStore.activePage > 1) {
      commentStore.activePageDecrement()
      commentStore.loadComment()
    }
  }
}

function toggleCommentModal() {
  isOpen.value = isOpen.value === false;
}

const stateForm = ref({
  nom: undefined,
  comment: undefined,
  note: undefined
})


async function submit(nom, comment, note) {

  if(!nom || !comment || !note) {
    alert('Merci de remplir tout les champs')

    return
  }
  if (comment.length > 90) {
    alert('Malheureusement le commentaire ne doit pas dépasser 80 caractères merci de le raccourcir')
    return
  }
commentStore.addComment(suppressSpecialChar(nom),suppressSpecialChar(comment),suppressSpecialChar(note))
isOpen.value=false
  commentStore.loadComment()

alert(' Merci ! Votre commentaire est bien enregistré , il apparaitra bientôt sur le site')
}
const commentMax = ref(false)
const infoMaxChar = ref('')
function checkLength(event){
  const commentLimit = 82

  if (event.target.value.length >= commentLimit +1 ) {
    commentMax.value = true
infoMaxChar.value = 'Commentaires trop grand. Merci de le réduire'
  }else {
    commentMax.value = false
    infoMaxChar.value = ` il vous reste =>  ${commentLimit - event.target.value.length} caratères`
  }
}

</script>


<template>


  <PresentationComponent/>

  <section id="commentSection">
    <h1 class="text-center text-[#D92332] text-4xl md:text-5xl m-5 ">
      <strong>L'avis de nos clients </strong>
    </h1>
    <div class="text-center text-[#D94350] text-xl group transition-all duration-300 ease-in-out">
      <button :onClick="toggleCommentModal">
        <span
            class="bg-left-bottom bg-gradient-to-r from-pink-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
      Laisser le votre !
        </span>
      </button>
      <!-- Modal to record new comment -->
      <UModal v-model="isOpen">

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
              <UTextarea  v-model="stateForm.comment" v-on:input="checkLength"/>
              <p :class="{help:true,'text-[#D92332]':commentMax===true}" >{{ infoMaxChar }}</p>
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
                @click="submit(stateForm.nom,stateForm.comment,stateForm.note)"
            >

            </UButton>

          </template>
        </UCard>

      </UModal>
      <!-- End of modal -->
    </div>


    <div class="flex flex-row flex-wrap m-4 justify-center max-w-[250px}">


      <div v-for="comment in commentStore.commentList?.results" class="m-3 max-w-[250px}">

        <CommentComponent :comment="comment"/>

      </div>


    </div>
    <div class="flex justify-center mb-6">


      <UButton
          label='<'
          color="red"
          variant="outline"
          size="xl"
          :onClick="refresh"
          class="m-1 "

      />
      <UButton
          label='>'
          color="red"
          variant="outline"
          size="xl"
          :onClick="refresh"
          class="m-1"
      />
    </div>
  </section>


</template>

<style scoped>


</style>
