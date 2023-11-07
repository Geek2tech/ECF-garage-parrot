<script setup lang="js">


import {useServicesStore} from "~/stores/servicesStore.js";
import pinia from "~/stores/index.ts";

const props = defineProps({
  token: null,
  serviceList: {}
})

const serviceStore = useServicesStore(pinia())

const columns = [{
  key: 'service_name',
  label: `Nom du carburant`,

},
  {
    key: 'service_description',
    label: 'Description',
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
  for (const item of Object.entries(props.serviceList)) {
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
const serviceName = ref()
const serviceDescription = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()

async function edit(id, name, description) {
  console.log('update')
  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await serviceStore.update(id, name, description, props.token)

  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}

async function add(name) {
  console.log('ajouter', name)
  if (newName.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }

  await serviceStore.add(name, props.token)
  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  //alert("Ajout réalisé")

}

async function supp(id) {

}

function setupSlider(id, name, description, action) {
  isOpen.value = true
// retreive data
  console.log(action)
  serviceName.value = name

  idToChange.value = id

  switch (action) {
    case 'modify' :
      sliderActionName.value = `Changement du nom du service`
      sliderInputName.value = `Veuillez saisir le nouveau nom et la description du service`
      newName.value = name
      serviceDescription.value = description
      actionToDo.value = 'Modifier'
      break
    case 'add' :
      sliderActionName.value = `Ajout d'un nouveau service`
      sliderInputName.value = `Veuillez saisir le nom et la description du service à ajouter`
      newName.value = ""
      serviceDescription.value = description
      actionToDo.value = 'Ajouter'
      break
    case 'delete' :
      sliderActionName.value = `Suppression d'un service`
      sliderInputName.value = `Voulez vous supprimer le service suivant`
      newName.value = ""
      serviceDescription.value = description
      actionToDo.value = 'supprimer'
      break
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
      supp(idToChange.value)

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
          @click="setupSlider(row.service_id,row.service_name,row.service_description,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-archive-box-x-mark"
          @click="setupSlider(row.service_id,row.service_name,row.service_description,'delete')"
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
            {{ sliderActionName }} <br>{{ serviceName }}
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
          @click="selectAction(actionToDo)"
      />


    </UCard>
  </USlideover>


</template>

<style scoped>

</style>