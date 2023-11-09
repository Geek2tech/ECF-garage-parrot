<script setup lang="js">

import pinia from "~/stores/index.ts";
import {useUserStore} from "~/stores/userStore.js";

const props = defineProps({
  token: null,
  usersList: {},
  profilList:{}
})
console.log(props.profilList)
const userStore = useUserStore(pinia())
const profils = []

for (const item of Object.entries(props.profilList?.results)) {
profils.push(item[1].profil_name)

}


const columns = [{
  key: 'first_name',
  label: `Prénom`,

},
  {
    key: 'last_name',
    label: 'Nom',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'profil_name',
    label: 'Profil',
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
  for (const item of Object.entries(props.usersList)) {
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
const firstName = ref()
const lastName=ref()
const profilName =ref()
const email = ref()
const serviceDescription = ref()
const idToChange = ref()
const sliderActionName = ref()
const sliderInputName = ref()
const actionToDo = ref()



async function edit(id, name, description) {

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

async function add(name,description) {

  if (newName.value === undefined || serviceDescription.value === undefined) {
    alert("Merci de saisir un nom et une description")
    return
  }

  await serviceStore.addService(name,description, props.token)
  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  alert("Ajout réalisé")

}

async function supp(id) {

  await serviceStore.deleteService(id,props.token)
  await serviceStore.loadServices()
  await refresh()
  isOpen.value = false
  alert("Suppression réalisée")

}

function setupSlider(id, fName,lName,uEmail,pName, action) {
  isOpen.value = true
// retreive data


  firstName.value=fName
  lastName.value=lName
  email.value=uEmail
  profilName.value=pName
  idToChange.value = id

  switch (action) {
    case 'modify' :
      sliderActionName.value = `Modification de l'utilisateur`
      sliderInputName.value = `Veuillez renseigner les champs suivants`


      actionToDo.value = 'Modifier'
      break
    case 'add' :
      sliderActionName.value = `Ajout d'un nouvel utilisateur`
      sliderInputName.value = `Veuillez renseigner les champs suivants`
      firstName.value=""
      lastName.value=""
      email.value=""
      profilName.value=""

      actionToDo.value = 'Ajouter'
      break
    case 'delete' :
      sliderActionName.value = `Suppression d'un utilisateur`
      sliderInputName.value = `Voulez vous supprimer l'utilisateur suivant`

      actionToDo.value = 'Supprimer'
      break
  }
}

function selectAction(action) {
  switch (action) {
    case 'Ajouter':
      add(newName.value,serviceDescription.value)
      break
    case 'Modifier':
      edit(idToChange.value, newName.value,serviceDescription.value)
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
        @click="setupSlider(null,null,null,null,null,'add')"
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
          @click="setupSlider(row.user_uuid,row.first_name,row.last_name,row.email,row.profil_name,'modify')"
      />
      <UButton
          color="red"
          variant="ghost"
          icon="i-heroicons-archive-box-x-mark"
          @click="setupSlider(row.user_uuid,row.first_name,row.last_name,row.email, row.profil_name,'delete')"
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
            {{ sliderActionName }} <br>{{ firstName }} {{lastName}}
          </h3>
          <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                   @click="isOpen = false"/>
        </div>
      </template>

      <h2 class="m-autp text-xl m-5 justify-center">{{ sliderInputName }}</h2>
      <div class="flex">
        <div class="flex-col">
          <label  for="firstName" class="justify-center">Prénom</label>
          <UInput
              v-model="firstName"
              variant="outline"
              color="red"
              required
              class="m-3"
          />
        </div>

        <div class="flex-col">
          <label  for="firstName" class="justify-center">Nom</label>
          <UInput
              v-model="lastName"
              variant="outline"
              color="red"
              required
              class="m-3"
          />
        </div>




      </div>

      <div class="flex-col">
        <label  for="firstName" class="justify-center">Email</label>
        <UInput
            v-model="email"
            variant="outline"
            color="red"
            required
            class="m-3"
        />
      </div>
      <div class="flex-col">
        <label  for="firstName" class="justify-center">Profil</label>
        <USelectMenu
            v-model="profilName"
            variant="outline"
            color="red"
            :options="profils"
            required
            class="m-3"
        />
      </div>

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