<script setup>import NotFoundVue from './NotFound.vue';

//POST
const createNewmovie = async (newMovie) => {
  const res = await fetch('http://localhost:5000/movies', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: newMovie.name, genre: newMovie.genre, synopsis: newMovie.synopsis })
  })
  if(res.status === 201) {
    const addedMovie = await res.json()
    
  }
}
</script>
 
<template>
<div>
  <p>Add Movie</p>
  Movie name: <input type="text">
  Genre: <input type="text">
  Synopsis: <input type="text">
</div>
</template>
 
<style>

</style>