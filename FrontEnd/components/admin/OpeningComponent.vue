<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useOpeningStore} from "~/stores/OpeningStore.js";

const props = defineProps({
  token: null,
  openingList: {}
})

const openingStore = useOpeningStore(pinia())

const columns = [{
  key: 'day',
  label: `Jour`,

},
  {
    key: 'morning',
    label: 'Matin',
  },
  {
    key:'afternoon',
    label:'Après midi'
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
  for (const item of Object.entries(props.openingList)) {
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
const day = ref()
const morningStart = ref()
const morningEnd =ref()
const afternoonStart = ref()
const afternoonEnd = ref()
const serviceDescription = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()
const hours = [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
const afternoonFields = ref(false)
const morningFields = ref(false)

async function edit(id, name, description) {


  await openingStore.update(day.value,morningStart.value,morningEnd.value,afternoonStart.value,afternoonEnd.value, props.token)

  await openingStore.getAllOpeningHours()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}

async function add(name,description) {



}

async function supp(id) {


}

function setupSlider(id, dayTochange,morning,afternoon, action) {
  isOpen.value = true
// retreive data

  day.value = dayTochange
  if (morning === 'fermé') {
    morningStart.value = 'fermé'
    morningEnd.value = 'fermé'
  }else {
    morningStart.value = morning.split('-')[0].split('h')[0]
    morningEnd.value = morning.split('-')[1].split('h')[0]
  }
  if (afternoon === 'fermé'){
    afternoonStart.value = 'fermé'
    afternoonEnd.value = 'fermé'
  }else {
    afternoonStart.value = afternoon.split('-')[0].split('h')[0]
    afternoonEnd.value = afternoon.split('-')[1].split('h')[0]
  }





  idToChange.value = id

  switch (action) {
    case 'modify' :
      sliderActionName.value = `Changement des horaires d'ouverture`
      sliderInputName.value = `Veuillez saisir les nouveaux horaires`

      actionToDo.value = 'Modifier'
      break
    case 'add' :
     break
    case 'delete' :
      break
  }
}

function selectAction(action) {
  switch (action) {
    case 'Ajouter':

      break
    case 'Modifier':
      edit(idToChange.value, newName.value,serviceDescription.value)
      break
    case 'Supprimer':
      break

  }


}

function toggleMorningField() {

  morningFields.value === true ? morningFields.value = false : morningFields.value = true

  if (morningFields.value === true) {
    morningStart.value = 'fermé'
    morningEnd.value ='fermé'

  }


}

function toggleAfternoonField() {

  afternoonFields.value === true ? afternoonFields.value = false : afternoonFields.value = true

  if (afternoonFields.value === true) {
    afternoonStart.value = 'fermé'
    afternoonEnd.value ='fermé'

  }


}
</script>

<template>



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
          @click="setupSlider(row.opening_id,row.day,row.morning,row.afternoon,'modify')"
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

      <div  class="m-5 text-2xl text-center">{{ day }}</div>
      <h2 class="text-2xl text-center mt-3 mb-3">Matin</h2>
      <div>Ouverture</div>
      <USelectMenu v-model="morningStart" :options="hours" :disabled="morningFields"/>
      <div>Fermeture</div>
      <USelectMenu v-model="morningEnd" :options="hours" :disabled="morningFields"/>
      <UCheckbox label="Fermé" @change="toggleMorningField" />
      <h2 class="text-2xl text-center mt-3 mb-3">Après midi</h2>
      <div>Ouverture</div>
      <USelectMenu v-model="afternoonStart" :options="hours" :disabled="afternoonFields"/>
      <div>Fermeture</div>
      <USelectMenu  v-model="afternoonEnd" :options="hours" :disabled="afternoonFields" />
      <UCheckbox label="Fermé" @change="toggleAfternoonField"  />
      <UButton
          :label="actionToDo"
          color="red"
          class="mt-5"
          @click="selectAction(actionToDo)"
      />


    </UCard>
  </USlideover>


</template>

<style scoped>

</style>