


<script lang="js">

export default {


  props: {
    comment: Object,
      },
  computed: {},
  methods: {
  }
}

</script>
<template>

<UCard class="oneComment  w-[250px] h-[250px] "
       :ui="{
    divide: 'divide-y divide-gray-300 dark:divide-white/50',
    background:'bg-gray-50 dark:bg-gray-700/70',
     header: {
      base: ' h-1/4 text-center',
    },
    body: {
      base: 'h-2/4'
    },
    footer: {
      base : 'h-1/4',
    }
  }"

>
  <template #header>
    <div class="text-center text-[#D92332]" >
      <strong>{{comment.sender_name}}</strong>
    </div>

  </template>
<div class="justify-center text-center " >
  {{comment.comment_text}}
</div>


  <template #footer >
    <div class="flex flex-row justify-center">
    <div v-for="n in comment.garage_note">

        <svg class="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
             fill="currentColor" viewBox="0 0 22 20">
          <path
              d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      </div>
    </div>
  </template>

</UCard>










</template>

<style scoped>
.barlow {
  font-family: Barlow,sans-serif;
}


</style>
