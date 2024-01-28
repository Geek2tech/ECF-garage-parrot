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
await carStore.getCars('noselect','','','','')
const constructorStore = useConstructorStore(pinia())
await constructorStore.getConstructors()
const fuelStore = useFuelStore(pinia())
await fuelStore.getFuels()
const transmissionStore = useTransmissionStore(pinia())
await transmissionStore.getTransmissions()
const towingStore = useTowingStore(pinia())
await towingStore.getTowing()
const equipementStore = useequipementStore(pinia())
await equipementStore.getEquipements()

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
  row: []
})


const page = ref(1)
const pageCount = 5
const total = ref(0)

async function refresh() {
  carsRows.value.row = []
  await carStore.getCars('noselect', '', '', '', '')
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
const primaryPHoto = ref()
const primaryPhotoUrl = ref('')
const secondaryPhotos = ref([])
const secondaryPhotosUrls = ref([])
// setup equipement table in modal
for (const item of Object.entries(equipementStore.equipementsList)) {
  equipementRows.value.row.push(item[1])
}

const equipementRowsPaginated = computed(() => {
  return equipementRows.value.row.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

async function edit(id, name, description) {

  SliderIsOpen.value = false
  alert('Modification réalisée')

}

async function add(car, equipement, primaryPhoto, secondaryPhotos) {

  //check  values
  const fieldNeededOrWrong = ref([])
  for (const key in car) {

    if (key !== 'carNumber' && key !== 'photo') {
      if (car[key] === '') {
        fieldNeededOrWrong.value.push(key)
      }

    }
  }
  if (!primaryPhoto.value) {
    fieldNeededOrWrong.value.push('PrimaryPhoto')
  }
  if (
      isNaN(car.year) === true ||
      isNaN(car.cylinderCapacity) === true ||
      isNaN(car.fiscalPower) === true ||
      isNaN(car.horsePower) === true ||
      isNaN(car.mileage) === true ||
      isNaN(car.price) === true

  ) {
    fieldNeededOrWrong.value.push("incorrect Value")
  }
  if (fieldNeededOrWrong.value.length > 0) {
    alert('merci de remplir tout les champs ou de vérifier leur contenus ( Champs en rouge )')


  } else {


    // retrieve fuel id
    fuelStore.fuelList.forEach((item) => {
      if (item.fuel_name === car.fuel) {
        car.fuel = item.fuel_id
      }
    })
    // retrieve constructor
    constructorStore.constructorsList.forEach((item) => {

      if (item.constructor_name === car.constructor) {
        car.constructor = item.constructor_id
      }
    })
    // retrieve towing mode id
    towingStore.towingList.forEach((item) => {
      if (item.mode_name === car.mode) {
        car.mode = item.towing_id
      }
    })
    // retrieve transmission id
    transmissionStore.transmissionsList.forEach((item) => {
      if (item.transmission_type_name === car.transmission) {
        car.transmission = item.transmission_type_id
      }
    })

    const carAddedResponse = await carStore.add(car, props.token)

    const carId = carAddedResponse?._value

    // store car equipement
    selectedEquipements.value.forEach((item) => {

      carStore.addCarEquipement(carId, item.equipement_id, props.token)

    })
    selectedEquipements.value = []
// add primary photo

    carStore.addCarPhoto(carId, 'Y', primaryPhoto?._value, props.token)
    primaryPhoto.value = ''
// add secondaries photos
      secondaryPhotos.value.forEach((item) => {
      carStore.addCarPhoto(carId, 'N', item, props.token)
      secondaryPhotos.value = []



    })
    alert("Ajout réalisé")
    modalIsOpen.value = false
    primaryPHoto.value=""
    primaryPhotoUrl.value = ''
    secondaryPhotos.value = []
    secondaryPhotosUrls.value = []
    await refresh()
  }
}

async function supp(id) {

  await carStore.delete(id, props.token)
  await carStore.getCars('noselect', '', '', '', '')

  SliderIsOpen.value = false
  alert("Suppression réalisée")
  await refresh()
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

  switch (action) {

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

  switch (action) {
    case 'add' :
      modalTitle.value = `Ajout d'une nouvelle annonce`
      for (const key in car) {
        car[key] = ''
      }
      total.value = equipementRows.value.row.length || 0
      actionToDo.value = 'Ajouter'
      page.value = 1
      break
  }

}

function selectAction(action) {
  switch (action) {
    case 'Ajouter':
      add(car, selectedEquipements, primaryPHoto, secondaryPhotos)
      break
    case 'Supprimer':
      supp(car.carNumber)
  }
}


const runTimeConfigs = useRuntimeConfig()
const url = `${runTimeConfigs.public.API_URL}/photo/`


function addPrimaryPhoto(event) {
  primaryPHoto.value = event.target.files[0]
  primaryPhotoUrl.value = URL.createObjectURL(event.target.files[0])

}

function addSecondaryPhoto(event) {

  secondaryPhotos.value[event.target.name] = event.target.files[0]
  secondaryPhotosUrls.value[event.target.name] = URL.createObjectURL(event.target.files[0])

}

function checkValue(event) {
  if (isNaN(event.target.value)) {
    event.target.style.color = 'white'
    event.target.style.background = "red"
  } else {
    event.target.style.color = 'black'
    event.target.style.background = "white"
  }
}

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
          color="red"
          variant="ghost"
          icon="i-heroicons-trash"
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


  <div>

    <!-- modal for add car -->
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
            <h3 class=" font-semibold leading-6 text-gray-900 m-auto">
              {{ modalTitle }}
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                     @click="modalIsOpen = false"/>
          </div>
        </template>
        <div id="annonces" class="container m-auto">
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
                    @change="checkValue"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Prix en €
              </div>
              <div>
                <UInput
                    v-model="car.price"
                    color="red"
                    @change="checkValue"

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
                    @change="checkValue"

                />

              </div>

            </div>

            <div class="flex-col m-3">
              <div>
                Kilométrage en km
              </div>
              <div>
                <UInput
                    v-model="car.mileage"
                    color="red"
                    @change="checkValue"

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
                Nombre de portes
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
                Cylindrée ex : 2000
              </div>
              <div>
                <UInput
                    v-model="car.cylinderCapacity"
                    color="red"
                    @change="checkValue"

                />

              </div>

            </div>
            <div class="flex-col m-3">
              <div>
                Puissance en cv
              </div>
              <div>
                <UInput
                    v-model="car.horsePower"
                    color="red"
                    @change="checkValue"

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


          />
          <UPagination
              v-model="page"
              :active-button="{ color:'red'}"
              color="red"
              :page-count="pageCount"
              :total="total"
          />

        </div>
        <div class="container m-auto">
          <h1 class="text-center border-b-2 border-red-500 text-2xl m-5 "> Photo principale</h1>
          <img :src="primaryPhotoUrl" alt="" class="m-auto md:max-w-[800px]">

          <UInput

              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addPrimaryPhoto"


          />
          <h1 class="text-center border-b-2 border-red-500 text-2xl m-5 "> Photos secondaires</h1>


          <UInput
              name="0"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[0]" alt="" class="max-w-[800px] m-auto">
          <UInput
              name="1"
              v-if="secondaryPhotos.length > 0"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[1]" alt="" class="max-w-[800px] m-auto ">

          <UInput
              name="2"
              v-if="secondaryPhotos.length > 1"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[2]" alt="" class="max-w-[800px] m-auto ">
          <UInput
              name="3"
              v-if="secondaryPhotos.length > 2"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[3]" alt="" class="max-w-[800px] m-auto ">
          <UInput
              name="4"
              v-if="secondaryPhotos.length > 3"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[4]" alt="" class="max-w-[800px] m-auto ">
          <UInput
              name="5"
              v-if="secondaryPhotos.length > 4"
              type="file"
              color="red"
              accept="image/*"
              class="m-3"
              @change="addSecondaryPhoto"
          />
          <img :src="secondaryPhotosUrls[5]" alt="" class="max-w-[800px] m-auto ">
          <UButton
              color="red"
              :label="actionToDo"
              size="lg"
              class="w-1/5 m-auto justify-center flex"
              @click="selectAction(actionToDo)"
          />
        </div>

      </UCard>

    </UModal>
  </div>


</template>

<style scoped>

</style>
