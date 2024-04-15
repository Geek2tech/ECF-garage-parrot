<script setup lang="ts">


definePageMeta({
  title: 'Votre identifiant Garage Vincent Parrot',
  description: 'lien unique password reset',
})


</script>
<script lang="ts">
export default {
  name: "msmForm",
  data() {
    return {
      form: {
        password: ""
      },
      stateForm: {
        message: undefined,
        title: undefined,
        label: undefined
      },
      modal: false
    }
  },
  methods: {
    handleSubmit: async function () {
      const route = useRoute()
      const id = route.params._id


      this.modal = true
      const body = {
        password: this.form.password,
        id: id,
      }
      const data = await useFetch('/api/readMsm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.form.password,
          id: id,

        })
      })

      if (data.data._rawValue.error) {

        this.stateForm.title = "Une erreur est survenue"
        this.stateForm.label = ""
        this.stateForm.message = data.data._rawValue.error

      } else {

        this.stateForm.title = "Voici votre mot de passe , merci de le garder précieusement"
        this.stateForm.label = "Votre mot de passe :"
        this.stateForm.message = data.data._rawValue.result
      }

    },
    toggleModal: function () {
      this.modal ? this.modal = false : this.modal = true
    },
  }
}

</script>

<template>
  <section id="login"
           class="mx-auto flex min-h-screen w-full items-center justify-center bg-[url('/images/car-3504910_1920.jpg')] bg-cover text-white"
  >
    <!-- component -->
    <form @submit.prevent="handleSubmit" class="flex w-[30rem] flex-col space-y-10">
      <div class="text-center text-4xl font-medium">Entrer votre mot de passe</div>


      <div
          class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-[#D92332]"
      >
        <input
            type="password"
            v-model="form.password"
            placeholder="Mot de passe"
            required
            class="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
            name="password"
        />
      </div>

      <button
          class="transform rounded-sm bg-[#D92332] py-2 font-bold duration-300 hover:bg-indigo-400"
          type="submit">
        Se connecter
      </button>


    </form>
  </section>

  <UModal v-model="modal">

    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        {{ stateForm.title }}
      </template>

      <UForm
          :state="stateForm"
      >

        <UFormGroup label="" name="Password" class="mb-4">

          <p>
            {{ stateForm.label }} <strong> {{ stateForm.message }} </strong>
          </p>
        </UFormGroup>

      </UForm>

      <template #footer class="flex text-center">
        <UButton
            label="close"
            type="submit"
            color="red"
            @click="toggleModal"
        >

        </UButton>

      </template>
    </UCard>

  </UModal>
</template>

<style scoped>

</style>
