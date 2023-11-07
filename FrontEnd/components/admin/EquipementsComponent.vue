<script setup lang="js">
import {useequipementStore} from "~/stores/equipementStore";

const props = defineProps({
  token: null,
  equipementsList: {}
})

const equipementStore = useequipementStore()

const columns = [{
  key: 'equipement_name',
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
  for (const item of Object.entries(props.equipementsList)) {
    rows.value.row.push(item[1])
    total.value = rows.value.row.length
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

async function editEquipement(id, name) {
  console.log('update')
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
  console.log('ajouter', name)
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

function setupSlider(id, name, action) {
  isOpen.value = true
// retreive data

  equipementName.value = name
  console.log(id)
  idToChange.value = id

  if (action === 'modify') {
    sliderActionName.value = `Changement du nom de l'équipement`
    sliderInputName.value = `Veuillez saisir le nouveau nom de l'équipement`
    newName.value = name
    actionToDo.value = 'Modifier'
  }
  if (action === 'add') {
    sliderActionName.value = `Ajout d'un nouvel équipement`
    sliderInputName.value = `Veuillez saisir le nom de l'équipement à ajouter`
    actionToDo.value = 'Ajouter'
  }
}

function selectAction(action) {
  console.log(action)
  action === 'Ajouter' ? addEquipement(newName.value) : editEquipement(idToChange.value, newName.value)

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


  <UTable :rows="rowsPaginated" :columns="columns">


    <template #actions-data="{ row }">


      <UButton
          color="orange"
          variant="ghost"
          icon="i-heroicons-pencil"
          @click="setupSlider(row.equipement_id,row.equipement_name,'modify')"
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