<script setup lang="js">
import request from '../helpers/request.js'
const route = useRoute()

const comments =  request.getRequest('/api/comments','TEST','GET')
//console.log(comments.result._rawValue)
</script>

<template>


<Presentation/>


</template>

<style scoped>


</style>
