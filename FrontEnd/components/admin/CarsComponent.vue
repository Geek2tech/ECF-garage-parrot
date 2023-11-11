<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useCarStore} from "~/stores/carsStore.js";

const props = defineProps({
  token: null,
  carList: {}
})

const carStore = useCarStore(pinia())

const columns = [{
  key: 'car_id',
  label: `Numéro annonce`,
  sortable: true

},
  {
    key: 'constructor_name',
    label: 'Marque',
    sortable: true
  }, {
    key: 'model_name',
    label: 'Modèle',
    sortable: true
  },
  {
    key: 'motor_type',
    label: 'Motorisation',
    sortable: true
  },
  {
    key: 'fuel_name',
    label: 'Carburant',
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

function refresh() {
  rows.value.row = []
  for (const item of Object.entries(carStore.carList.results)) {
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
const car = {
  carNumber: "",
  constructor: '',
  color: '',
  price: '',
  year: '',
  mileage: '',
  horsePower: '',
  fiscalPower: '',
  doors: '',
  cylinderCapacity: '',
  motorType: '',
  fuel: '',
  mode: '',
  modelName: '',
  transmission: '',
  photo: '',

}
const inputDisabled = ref(false)

const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()

async function edit(id, name, description) {

  if (carNumber.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await serviceStore.update(id, name, description, props.token)

  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  alert('Modification réalisée')

}

async function add(name, description) {

  if (carNumber.value === undefined || serviceDescription.value === undefined) {
    alert("Merci de saisir un nom et une description")
    return
  }

  await serviceStore.addService(name, description, props.token)
  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  alert("Ajout réalisé")

}

async function supp(id) {

  await carStore.delete(id, props.token)
  await carStore.getCars('noselect','','','','')
  await refresh()
  isOpen.value = false
  alert("Suppression réalisée")

}

function setupSlider(row, action) {
  isOpen.value = true

  const runTimeConfigs = useRuntimeConfig()
  const url = `${runTimeConfigs.public.API_URL}/photo/`

  car.carNumber = row.car_id
  car.constructor = row.constructor_name
  car.color = row.color
  car.price = row.price
  car.year = row.circulation_year
  car.mileage = row.mileage
  car.horsePower = row.horse_power
  car.fiscalPower = row.fiscal_power
  car.doors = row.doors
  car.cylinderCapacity = row.cylinder_capacity
  car.motorType = row.motor_type
  car.modelName = row.model_name
  car.fuel = row.fuel_name
  car.mode = row.mode_name
  car.transmission = row.transmission_type_name
  car.photo = url + row.photo_name

  console.log(car)
  switch (action) {
    case 'modify' :
      sliderActionName.value = `Changement du nom du service`
      sliderInputName.value = `Veuillez saisir le nouveau nom et la description du service`

      actionToDo.value = 'Modifier'
      break
    case 'add' :
      sliderActionName.value = `Ajout d'un nouveau service`
      sliderInputName.value = `Veuillez saisir le nom et la description du service à ajouter`

      console.log(car)
      actionToDo.value = 'Ajouter'
      break
    case 'delete' :
      sliderActionName.value = `Suppression d'une annonce`
      sliderInputName.value = `Voulez vous supprimer l'annonce :`
      inputDisabled.value = true

      actionToDo.value = 'Supprimer'
      break
  }
}

function selectAction(action) {
  switch (action) {
    case 'Ajouter':
      add(carNumber.value, serviceDescription.value)
      break
    case 'Modifier':
      edit(idToChange.value, carNumber.value, serviceDescription.value)
      break
    case 'Supprimer':
      supp(car.carNumber)

  }


}

const runTimeConfigs = useRuntimeConfig()
const url = `${runTimeConfigs.public.API_URL}/photo/`

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
      :sort="{ column: 'car_id' }"
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
          @click="setupSlider(row.car_id,row,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-archive-box-x-mark"
          @click="setupSlider(row,'delete')"
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

      <h2 class="m-autp text-lg font-bold">{{ sliderInputName }}</h2>
      <h2 class="m-autp text-lg font-bold text-center"> {{ car.carNumber }}</h2>
      <img crossorigin="anonymous" :src="car.photo" alt="photo">
      <div class="m-3">
        Constructeur: {{ car.constructor }}
        <div>
          Modèle : {{ car.modelName }}
        </div>
       <div>
         Couleur : {{ car.color }}
       </div>
        <div>
          Motorisation : {{ car.motorType }}
        </div>
        <div>
          Cylindrée : {{ car.cylinderCapacity}}
        </div>
        <div>
          Carburant : {{ car.fuel}}
        </div>
        <div>
          Puissance moteur: {{car.horsePower}} cv
        </div>
        <div>
          Puissance Fiscal : {{ car.fiscalPower}} cv
        </div>
        <div>
        Année : {{ car.year}}
        </div>
        <div>
          Kilométrage : {{ car.mileage }}
        </div>
        <div>
          Prix : {{ car.price }}
        </div>
      </div>


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