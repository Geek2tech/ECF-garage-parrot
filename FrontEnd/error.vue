

<template>
</template>

<script lang="js">
export default {
  methods: {
    goBack() {
      this.$router.push('/')
    },
    },
  mounted() {
    this.goBack()
  }
}
</script>

<style scoped>
.button {
  padding: 4px 6px;
  margin: 10px 0px;
  background: black;
  color: white;
}
</style>