<script setup lang="js">
import {useequipementStore} from "~/stores/equipementStore";

const props = defineProps({
  token:null,
  equipementsList:{}
})

const equipementStore = useequipementStore()

const columns = [{
  key: 'equipement_name',
  label :`Nom de l'équipement`
},
  {
    key:'actions'
  }
]

const rows = ref({
  row:[]
})

const page = ref(1)
const pageCount = 10
const total = ref()
function refresh() {
  rows.value.row=[]
  for (const item of Object.entries(props.equipementsList))  {
    rows.value.row.push(item[1])
    total.value = rows.value.row.length
    page.value=1
  }

}
 refresh()




const rowsPaginated = computed(() => {
  return rows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

async function editEquipement(id){
console.log('edit',id)
}

async function addEquipement(name){
console.log('ajouter')
}


</script>

<template>
<div mt-3>
  <UButton
      label="Ajouter"
      color="red"
      @click="addEquipement"
  />
</div>




  <UTable :rows="rowsPaginated" :columns="columns">


    <template #actions-data="{ row }">


      <UButton
          color="orange"
          variant="ghost"
          icon="i-heroicons-pencil"
          @click="editEquipement(row.equipement_id)"
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