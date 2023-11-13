<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useCarStore} from "~/stores/carsStore.js";
import {useConstructorStore} from "~/stores/constructorStore.js";
import {useFuelStore} from "~/stores/fuelStore.js";
import {useTransmissionStore} from "~/stores/transmissionStore.js";
import {useTowingStore} from "~/stores/towingStore.js";
import {useequipementStore} from "~/stores/equipementStore.js";

const props = defineProps({
  token: null,
  carList: {}
})

const carStore = useCarStore(pinia())
const constructorStore = useConstructorStore(pinia())
const fuelStore = useFuelStore(pinia())
const transmissionStore = useTransmissionStore(pinia())
const towingStore = useTowingStore(pinia())
const equipementStore = useequipementStore(pinia())

const carColumns = [{
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
const equipementColumns = [{
  key: 'equipement_name',
  label: 'Equipement',
  sortable: true
}]

const carsRows = ref({
  row: []
})
const equipementRows = ref({
  row:[]
})


const page = ref(1)
const pageCount = 5
const total = ref()

function refresh() {
  carsRows.value.row = []
  for (const item of Object.entries(carStore.carList.results)) {
    carsRows.value.row.push(item[1])
    total.value = carsRows.value.row.length || 0
    page.value = 1
  }

}
// Setup carTable
const carRowsPaginated = computed(() => {
  return carsRows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})
refresh()






const SliderIsOpen = ref(false)
const modalIsOpen = ref(false)

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
// slider conf
const inputDisabled = ref(false)
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()
//modal conf
const modalTitle = ref()
const selectedEquipements = ref([])
// setup equipement table in modal
for (const item of Object.entries(equipementStore.equipementsList)) {
  equipementRows.value.row.push(item[1])
}

const equipementRowsPaginated = computed(() => {
  return equipementRows.value.row.slice((page.value - 1) * pageCount,(page.value) *pageCount)
})

async function edit(id, name, description) {

  if (carNumber.value === undefined) {
    alert("Merci de saisir un nom")
    return
  }
  await serviceStore.update(id, name, description, props.token)

  await serviceStore.loadServices()
  await refresh()
  SliderIsOpen.value = false
  alert('Modification réalisée')

}

async function add(name, description) {


  total.value = carsRows.value.row.length || 0
  page.value = 1
  alert("Ajout réalisé")

}

async function supp(id) {

  await carStore.delete(id, props.token)
  await carStore.getCars('noselect', '', '', '', '')
  await refresh()
  SliderIsOpen.value = false
  alert("Suppression réalisée")

}

function setupSlider(row, action) {
  SliderIsOpen.value = true

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
  SliderIsOpen.value = true
}

function setupModal(row, action) {
  modalIsOpen.value = true
  console.log(row)
  switch (action) {
    case 'add' :
      modalTitle.value = `Ajout d'une nouvelle annonce`
      total.value = equipementRows.value.row.length || 0
      page.value = 1
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
        @click="setupModal(row,'add')"
    />
  </div>


  <UTable
      :rows="carRowsPaginated"
      :columns="carColumns"
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
  <!-- slider -->
  <USlideover v-model="SliderIsOpen" prevent-close>
    <UCard class="flex flex-col flex-1"
           :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ sliderActionName }}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="SliderIsOpen = false"/>
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
          Cylindrée : {{ car.cylinderCapacity }}
        </div>
        <div>
          Carburant : {{ car.fuel }}
        </div>
        <div>
          Puissance moteur: {{ car.horsePower }} cv
        </div>
        <div>
          Puissance Fiscal : {{ car.fiscalPower }} cv
        </div>
        <div>
          Année : {{ car.year }}
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
  <!-- Modal -->

  <div>


    <UModal v-model="modalIsOpen" fullscreen>
      <UCard
          :ui="{
          base: 'h-full flex flex-col',
          rounded: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          body: {
            base: 'grow overflow-y-auto'
          }
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class=" font-semibold leading-6 text-gray-900 ">
              {{ modalTitle }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                     @click="modalIsOpen = false"/>
          </div>
        </template>
        <div id="annonces" class="container ">
          <h1 class="text-center border-b-2 border-red-500 text-2xl m-5 "> Modèle</h1>
          <div class="flex flex-wrap justify-center">
            <div class="flex-col m-3">
              <div>
                Constructeur
              </div>
              <div>
                <USelect
                    v-model="car.constructor"
                    color="red"
                    :options='constructorStore.constructorsList'
                    option-attribute="constructor_name"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Modèle
              </div>
              <div>
                <UInput
                    v-model="car.modelName"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Année de mise en circulation
              </div>
              <div>
                <UInput
                    v-model="car.year"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Prix
              </div>
              <div>
                <UInput
                    v-model="car.price"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Puissance Fiscal
              </div>
              <div>
                <UInput
                    v-model="car.fiscalPower"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Kilométrage
              </div>
              <div>
                <UInput
                    v-model="car.mileage"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Couleur
              </div>
              <div>
                <UInput
                    v-model="car.color"
                    color="red"

                />

              </div>

            </div>


            <div class="flex-col m-3">
              <div>
                Nombre de porte
              </div>
              <div>
                <USelect
                    v-model="car.doors"
                    color="red"
                    :options="['2','3','4','5']"

                />

              </div>

            </div>

          </div>

          <h1 class="text-center border-b-2 border-red-500 text-2xl m-5 "> Caractéristiques Techniques</h1>
          <div class="flex flex-wrap justify-center  ">


            <div class="flex-col m-3">
              <div>
                Type de motorisation
              </div>
              <div>
                <UInput
                    v-model="car.motorType"
                    color="red"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Cylindrée
              </div>
              <div>
                <UInput
                    v-model="car.cylinderCapacity"
                    color="red"

                />

              </div>

            </div>
            <div class="flex-col m-3">
              <div>
                Carburant
              </div>
              <div>
                <USelect
                    v-model="car.fuel"
                    color="red"
                    :options='fuelStore.fuelList'
                    option-attribute="fuel_name"

                />

              </div>

            </div>
            <div class="flex-col m-3">
              <div>
                Type de boite
              </div>
              <div>
                <USelect
                    v-model="car.transmission"
                    color="red"
                    :options='transmissionStore.transmissionsList'
                    option-attribute="transmission_type_name"

                />

              </div>

            </div>
            <div class="flex-col m-3">
              <div>
                Type de transmission
              </div>
              <div>
                <USelect
                    v-model="car.mode"
                    color="red"
                    :options='towingStore.towingList'
                    option-attribute="mode_name"

                />

              </div>

            </div>
          </div>
          <h1 class="text-center border-b-2 border-red-500 text-2xl m-5 "> Equipements</h1>

          <UTable
              v-model="selectedEquipements"
              :rows="equipementRowsPaginated"
              :columns="equipementColumns"
              :ui="{
        base : 'overflow-y'
      }"
              @change="console.log(selectedEquipements)"

          />
          <UPagination
              v-model="page"
              :active-button="{ color:'red'}"
              color="red"
              :page-count="pageCount"
              :total="total"
          />

        </div>


      </UCard>
    </UModal>
  </div>



</template>

<style scoped>

</style>