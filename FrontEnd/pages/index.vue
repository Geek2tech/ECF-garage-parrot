<script setup lang="js">
import {useCommentStore} from "~/stores/commentStore.js";
import pinia from "~/stores/index.ts";
import CommentComponent from "~/components/CommentComponent.vue";
import PresentationComponent from "~/components/PresentationComponent.vue";
import ServicesComponent from "~/components/ServicesComponent.vue";
import {useServicesStore} from "~/stores/servicesStore.js";




const route = useRoute()

// service part management

const serviceStore =  useServicesStore(pinia())
 await serviceStore.loadServices()


// comment part management

const commentStore = useCommentStore(pinia())
await commentStore.loadComment()

function refresh(event) {


  if (event.target.innerText === ">") {

    if (commentStore.activePage < commentStore.nbPage) {
      commentStore.activePageIncrement()
      commentStore.loadComment(parseInt(commentStore.activePage))
      e
    }

  } else {

    if (commentStore.activePage > 1) {
      commentStore.activePageDecrement()
      commentStore.loadComment()

    }

  }
}
// add comment modal management
function toggleCommentModal() {

  commentStore.toggleModal()
}



</script>



<template>
<div>
  <Head>
    <Title> Garage Vincent Parrot</Title>
  </Head>
</div>

  <section id="presentationSection">

    <PresentationComponent/>
  </section>

  <section id="servicesSection" class="   bg-[url('/images/car-3504910_1920.jpg')] h-auto  ">

<div id="descriptionService" class="">
  <h1 class="  bg-black/70 p-4 text-4xl md:text-5xl text-center text-[#D92332]">Nos prestations</h1>
  <p class="  text-xl md:text-4xl bg-black/70 text-center">Notre équipe de passionnée de mécanique et d'automobile vous propose les prestations suivantes</p>
<div class="serviceComponent  p-4  flex  items-center justify-center  flex-wrap m-5   " >
  <ServicesComponent v-for="service in serviceStore.services"  :service="service"/>
</div>


</div>

  </section>


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

<!-- Modal to add comments and note -->
<AddCommentComponent v-model="commentStore.addModalActive"/>


    </div>


    <div class="flex flex-row flex-wrap m-4 justify-center max-w-[250px}">
      <div v-for="comment in commentStore.commentList?.results" class="m-3 max-w-[250px}">
        <CommentComponent :comment="comment"/>
      </div>
    </div>
    <div class="flex justify-center mb-6">
      <UButton v-if="commentStore.activePage > 1"
          label='<'
          color="red"
          variant="outline"
          size="xl"
          :onClick="refresh"
          class="m-1 "

      />

      <UButton v-if="commentStore.activePage < commentStore.nbPage"
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


p {
  color: #F2F2F2;

}





</style>
