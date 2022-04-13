<script setup>
import { ref , onBeforeMount } from 'vue'
import MovieList from '../components/BaseMovieList.vue';
const movies = ref([])

// GET
const getMovies = async () => {
  const res = await fetch('http://localhost:5000/movies')
  if (res.status === 200) {
    movies.value = await res.json()
    console.log(movies.value)
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getMovies()
})
</script>
 
<template>
<div>
  <movie-list 
  :movies = "movies"
  />
  </div>
</template>
 
<style>

</style>