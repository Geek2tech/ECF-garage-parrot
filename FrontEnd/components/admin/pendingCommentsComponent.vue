<script setup lang="js">
import {useCommentStore} from "~/stores/commentStore.js";
import pinia from "~/stores/index.ts";
import {suppressSpecialChar} from "~/helpers/fieldControl.js";

const props =defineProps({
  commentsList : {},
  token : null
})
const commentStore = useCommentStore(pinia())

const columns = [ {
  key: 'sender_name',
  label: 'Nom'
}, {
  key: 'comment_text',
  label: 'Commentaire'
}, {
  key: 'garage_note',
  label: 'Note',
  sortable:true
},{
  key:'actions'
},

]




const rows = ref({
  row:[]
})

const page = ref(1)
const pageCount = 10
const total = ref()
function refresh() {
  rows.value.row=[]
  for (const comment of Object.entries(props.commentsList))  {
    rows.value.row.push(comment[1])
    total.value = rows.value.row.length
    page.value=1
  }

}
 refresh()



const rowsPaginated = computed(() => {
  return rows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})


async function validateComment(id) {

  await commentStore.validePendingComment(id,props.token)
  await commentStore.getPendingComment(props.token)

 await  refresh()

}
async function rejectComment(id){

  await commentStore.deletePendingComment(id,props.token)
  await commentStore.getPendingComment(props.token)

 refresh()


}





</script>

<template>


  <UTable :rows="rowsPaginated" :columns="columns">


  <template #actions-data="{ row }">

          <UButton
          color="green"
          variant="ghost"
          icon="i-heroicons-document-check"
          @click="validateComment(row.comment_id)"
      />

    <UButton
        color="red"
        variant="ghost"
        icon="i-heroicons-archive-box-x-mark"
        @click="rejectComment(row.comment_id)"
    />
  </template>

  </UTable>
  <UPagination
      v-model="page"
     :active-button="{ color:'red'}"
      color="red"
      :page-count="pageCount"
      :total="total"
  />

</template>

<style scoped>

</style>