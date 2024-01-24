<script setup lang="js">
import {useequipementStore} from "~/stores/equipementStore";
import {useFuelStore} from "~/stores/fuelStore.js";

const props = defineProps({
  token: null,
  fuelList: {}
})

const fuelStore = useFuelStore()
await fuelStore.getFuels(props.token)
const columns = [{
  key: 'fuel_name',
  label: `Nom du carburant`,
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
const total = ref()

async function refresh() {
  rows.value.row = []
  for (const item of Object.entries(fuelStore.fuelList)) {
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
const fuelName = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()
const isdisabled = ref(false)
const numberOfCars = ref(0)

async function deleteFuel(id) {

  if (numberOfCars.value > 0) {
    alert("Impossible de supprimer ce carburant, il est utilisé par au moins un véhicule")
    isOpen.value = false
    return
  }
  await fuelStore.deleteFuel(id, props.token)
 await fuelStore.getFuels()
  await refresh()


  isOpen.value = false
  alert('Suppression réalisée')
}

async function edit(id, name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await fuelStore.updateFuel(id, name, props.token)

  await fuelStore.getFuels()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}

async function add(name) {

  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }

  await fuelStore.addFuel(name, props.token)
  await fuelStore.getFuels()
  await refresh()
  isOpen.value = false
  alert("Ajout réalisé")

}

function setupSlider(id, name, nombre, action) {
  isOpen.value = true
  numberOfCars.value = nombre
// retreive data

  fuelName.value = name

  idToChange.value = id

  if (action === 'modify') {
    sliderActionName.value = `Changement du nom `
    sliderInputName.value = `Veuillez saisir le nouveau nom du carburant`
    isdisabled.value = false
    newName.value = name
    actionToDo.value = 'Modifier'
  }
  if (action === 'add') {
    sliderActionName.value = `Ajout d'un nouveau `
    sliderInputName.value = `Veuillez saisir le nom du carburant à ajouter`
    isdisabled.value = false
    newName.value = ""
    actionToDo.value = 'Ajouter'
  }
  if (action === 'delete') {
    sliderActionName.value = `Suppression`
    sliderInputName.value = `Suppression du carburant :`
    isdisabled.value = true
    newName.value = name
    actionToDo.value = 'Supprimer'
  }
}

function selectAction(action) {

  switch (action) {
    case 'Supprimer':
      deleteFuel(idToChange.value)
      break
    case 'Modifier':
      edit(idToChange.value, newName.value)
      break
    case 'Ajouter':
      add(newName.value)
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
          @click="setupSlider(row.fuel_id,row.fuel_name,null,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="setupSlider(row.fuel_id,row.fuel_name,row.nombre,'delete')"
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
            {{ sliderActionName }}
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
