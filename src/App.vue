<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
  <HomeView />
</template>

<script>
import HomeView from './views/HomeView.vue'

export default {
  name: 'App',
  components: {
    HomeView
  }
}
</script>

<style>
@font-face {
  font-family: 'Google Sans';
  src: url('@/assets/fonts/GoogleSans-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'Google Sans', 'Helvetica Neue', sans-serif;
}
</style>
