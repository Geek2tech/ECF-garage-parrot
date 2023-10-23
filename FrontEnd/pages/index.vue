<script setup lang="js">
import {useCommentStore} from "~/stores/comments.js";
import {storeToRefs} from "pinia";
import pinia from "~/stores/index.ts";
import CommentComponent from "~/components/CommentComponent.vue";
import PresentationComponent from "~/components/PresentationComponent.vue";

const route = useRoute()
const commentState = useCommentStore(pinia())
commentState.loadComment(1)
function refresh(event) {
  console.log('refetct')
  const pageCom = event.target.innerText
  console.log(pageCom)
  commentState.loadComment(pageCom)

}




</script>


<template>


  <PresentationComponent/>

  <div class="flex flex-row flex-wrap m-4 justify-center max-w-[250px}">


    <div v-for="comment in commentState.commentList?.results" class="m-3 max-w-[250px}">

      <CommentComponent :comment="comment"/>

    </div>


  </div>
  <div class="flex justify-center mb-6">
    <div v-for="n in commentState.commentList?.pages" >

      <UButton :label=n.toString() color="red" variant="outline" size="xl" :onClick="refresh" class="m-1"/>
    </div>
  </div>


</template>

<style scoped>


</style>
