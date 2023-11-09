<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useConstructorStore} from "~/stores/constructorStore.js";

const props = defineProps({
  token: null,
  constructorList: {}
})


const constructorStore = useConstructorStore(pinia())
const columns = [{
  key: 'constructor_name',
  label: `Nom de l'équipement`
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
const total = ref()

function refresh() {
  rows.value.row = []
  for (const item of Object.entries(props.constructorList)) {
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
const ConstructorName = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()

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

function setupSlider(id, name, action) {
  isOpen.value = true
// retreive data

  ConstructorName.value = name

  idToChange.value = id

  if (action === 'modify') {
    sliderActionName.value = `Changement du nom du constructeur`
    sliderInputName.value = `Veuillez saisir le nouveau nom du construtor`
    newName.value = name
    actionToDo.value = 'Modifier'
  }
  if (action === 'add') {
    sliderActionName.value = `Ajout d'un nouveau constructeur`
    sliderInputName.value = `Veuillez saisir le nom du constructeur à ajouter`
    newName.value = ""
    actionToDo.value = 'Ajouter'
  }
}

function selectAction(action) {

  action === 'Ajouter' ? add(newName.value) : edit(idToChange.value, newName.value)

}


</script>

<template>
  <div>
    <UButton
        label="Ajouter"
        color="red"
        @click="setupSlider(null,null,'add')"
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
          @click="setupSlider(row.constructor_id,row.constructor_name,'modify')"
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