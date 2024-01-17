<script setup lang="js">
import {useequipementStore} from "~/stores/equipementStore";
import pinia from "~/stores/index.ts";

const props = defineProps({
  token: null,

})

const equipementStore = useequipementStore(pinia())
await equipementStore.getEquipements()
const columns = [{
  key: 'equipement_name',
  label: `Nom de l'équipement`,
  sortable: true
},
  {
    key: 'nombre',
    label: `Nombre de véhicules`,
    sortable: true
  },
  {
    key: 'actions'
  }
]

const rows = ref({
  row: []
})

const page = ref(1)
const pageCount = 10
const total = ref(0)
const isdisabled = ref(false)

function refresh() {
  rows.value.row = []
  for (const item of Object.entries(equipementStore.equipementsList)) {
    rows.value.row.push(item[1])
    total.value = rows.value.row.length || 0
    page.value = 1
  }

}

refresh()


const rowsPaginated = computed(() => {
  return rows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
const isOpen = ref(false)
const newName = ref()
const equipementName = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()
const numberOfCars = ref()

async function editEquipement(id, name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await equipementStore.updateEquipements(id, name, props.token)

  await equipementStore.getEquipements()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}

async function addEquipement(name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }

  await equipementStore.addEquipement(name, props.token)
  await equipementStore.getEquipements()
  await refresh()
  isOpen.value = false
  //alert("Ajout réalisé")

}

function setupSlider(id, name, nombre, action) {
  isOpen.value = true
// retreive data

  equipementName.value = name

  idToChange.value = id

  if (action === 'modify') {
    sliderActionName.value = `Changement du nom de l'équipement`
    sliderInputName.value = `Veuillez saisir le nouveau nom de l'équipement`
    isdisabled.value = false
    newName.value = name
    actionToDo.value = 'Modifier'
  }
  if (action === 'add') {
    sliderActionName.value = `Ajout d'un nouvel équipement`
    sliderInputName.value = `Veuillez saisir le nom de l'équipement à ajouter`
    isdisabled.value = false
    newName.value = ""
    actionToDo.value = 'Ajouter'
  }
  if (action === 'delete') {
    sliderActionName.value = `Suppression d'un équipement`
    sliderInputName.value = " "
    newName.value = name
    isdisabled.value = true
    numberOfCars.value = nombre
    actionToDo.value = 'Supprimer'
  }
}

  function selectAction(action) {


  switch (action) {
    case 'Supprimer':
      if (numberOfCars.value > 0) {

        alert("Impossible de supprimer cet équipement, il est utilisé par au moins un véhicule")
        isOpen.value = false
        return
      }
       equipementStore.deleteEquipement(idToChange.value, props.token)
      isOpen.value = false
       refresh()
      alert('Suppression réalisée')

      break
    case 'Modifier':
      editEquipement(idToChange.value, newName.value)
      isOpen.value = false
        refresh()
      alert('Modification réalisée')
      break
    case 'Ajouter':
      addEquipement(newName.value)
      isOpen.value = false
        refresh()
      alert('Ajout réalisé')
      break
  }

}


</script>

<template>
  <div>
    <UButton
        label="Ajouter"
        color="red"
        @click="setupSlider(null,null,null,'add')"
    />
  </div>


  <UTable
      :rows="rowsPaginated"
      :columns="columns"
      :ui="
      {
        td: { base : 'whitespace-normal'}
      }"

  >


    <template #actions-data="{ row }">


      <UButton
          color="orange"
          variant="ghost"
          icon="i-heroicons-pencil"
          @click="setupSlider(row.equipement_id,row.equipement_name,null,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-archive-box-x-mark"
          @click="setupSlider(row.equipement_id,row.equipement_name, row.nombre,'delete')"
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

  <USlideover v-model="isOpen" prevent-close>
    <UCard class="flex flex-col flex-1"
           :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ sliderActionName }} <br>{{ equipementName }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="isOpen = false"/>
        </div>
      </template>

      <label for="newName" class="m-autp">{{ sliderInputName }}</label>
      <UInput
          v-model="newName"
          variant="outline"
          color="red"
          required
          :disabled="isdisabled"
          class="m-3"
      />
      <UButton
          :label="actionToDo"
          color="red"
          @click="selectAction(actionToDo)"
      />


    </UCard>
  </USlideover>


</template>

<style scoped>

</style>
