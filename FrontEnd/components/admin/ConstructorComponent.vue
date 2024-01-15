<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useConstructorStore} from "~/stores/constructorStore.js";

const props = defineProps({
  token: null,

})



const constructorStore = useConstructorStore(pinia())

 await constructorStore.getConstructors()
const columns = [{
  key: 'constructor_name',
  label: `Nom du constructeur`,
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

function refresh() {
  rows.value.row = []
  for (const item of Object.entries(constructorStore.constructorsList)) {
    rows.value.row.push(item[1])
    total.value = rows.value.row.length || 0
    page.value = 1
  }

}

await refresh()


const rowsPaginated = computed(() => {
  return rows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
const isOpen = ref(false)
const newName = ref()
const ConstructorName = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()
const isdisabled = ref(false)
const numberOfCars = ref(0)


async function suppress(id) {

  if (numberOfCars.value > 0) {
    alert("Impossible de supprimer un constructeur qui possède des véhicules")
    isOpen.value = false
    return
  }
  await constructorStore.deleteConstructor(id, props.token)
  await constructorStore.getConstructors()
  await refresh()
  isOpen.value = false
  alert('Suppression réalisée')

}

async function edit(id, name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await constructorStore.updateConstructor(id, name, props.token)

  await constructorStore.getConstructors()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}



async function add(name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }

  await constructorStore.addConstructor(name, props.token)
  await constructorStore.getConstructors()
  await refresh()
  isOpen.value = false
  alert("Ajout réalisé")

}

function setupSlider(id, name, nombre, action) {
  isOpen.value = true
// retreive data

  ConstructorName.value = name

  idToChange.value = id

  if (action === 'modify') {
    sliderActionName.value = `Changement du nom du constructeur`
    sliderInputName.value = `Veuillez saisir le nouveau nom du construtor`
    newName.value = name
    isdisabled.value = false
    actionToDo.value = 'Modifier'
  }
  if (action === 'add') {
    sliderActionName.value = `Ajout d'un nouveau constructeur`
    sliderInputName.value = `Veuillez saisir le nom du constructeur à ajouter`
    isdisabled.value = false
    newName.value = ""
    actionToDo.value = 'Ajouter'
  }
  if (action === 'delete') {
    sliderActionName.value = `Suppression du constructeur`
    sliderInputName.value = `Construteur à supprimer`
    newName.value = name
    isdisabled.value = true
numberOfCars.value = nombre
    actionToDo.value = 'Supprimer'
  }
}

function selectAction(action) {



  switch (action) {
    case 'Ajouter':
      add(newName.value)
      break
    case 'Modifier':
      edit(idToChange.value, newName.value)
      break
    case 'Supprimer':
      suppress(idToChange.value )
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
          @click="setupSlider(row.constructor_id,row.constructor_name,null,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-archive-box-x-mark"
          @click="setupSlider(row.constructor_id,row.constructor_name, row.nombre,'delete')"
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
            {{ sliderActionName }} <br>{{ ConstructorName }}
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
