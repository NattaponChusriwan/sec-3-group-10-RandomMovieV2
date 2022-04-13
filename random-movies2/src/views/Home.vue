<script setup>
import { ref , onBeforeMount } from 'vue'
import MovieList from '../components/BaseMovieList.vue';
import AddEditMovie from '../components/AddEditMovie.vue';
const movies = ref([])

// GET
const getMovies = async () => {
  const res = await fetch('http://localhost:5000/movies')
  if (res.status === 200) {
    movies.value = await res.json()
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getMovies()
})

// DELETE
const removeMovie = async (deleteMovieId) => {
  const res = await fetch(`http://localhost:5000/movies/${deleteMovieId}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    movies.value = movies.value.filter((movie) => movie.id !== deleteMovieId)
    console.log('deleted successfully')
  } else console.log('error, cannot delete data')
}

//POST
const newestMovie = ref({})
const createNewMovie = async (newMovie) => {
  const res = await fetch('http://localhost:5000/movies', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: newMovie.name , genre: newMovie.genre , synopsis: newMovie.synopsis, imgPath: newMovie.imgPath })
  })
  if(res.status === 201) {
    const addedMovie = await res.json()
    movies.value.push(addedMovie)
    alert('added successfully')
  } else console.log('error, cannot added')
  newestMovie.value = {}
}

const closeForm = () => {
  newestMovie.value = {}
}

//PUT


const editMode = (editMovie) => {
  newestMovie.value = editMovie
}

const updateMovie = async (editingMovie) => {
  const res = await fetch(`http://localhost:5000/movies/${editingMovie.id}`, {
    method: 'PUT',
    headers:{
      'content-type' : 'application/json'
    },
    body: JSON.stringify({ name: editingMovie.name, genre: editingMovie.genre, synopsis: editingMovie.synopsis })
  })

  if (res.status === 200) {
    const editedMovie = await res.json()
    movies.value = movies.value.map((movie) => 
    movie.id === editedMovie.id 
    ? {...movie, name: editedMovie.name, genre: editedMovie.genre, synopsis: editedMovie.synopsis} 
    : movie
    )
  } else console.log('error, cannot be added')

  closeForm()
}
</script>
 
<template>
<div>
  <add-edit-movie 
   @addMovie="createNewMovie" :movies="newestMovie" @updateMovie="updateMovie"/>
  <div id="cards-recommend" class="grid grid-cols-1 gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2" >
    <movie-list
    v-for="movie in movies" :key="movie.id"
    :movie = "movie"
    @editMovie="editMode"
    @deleteMovie="removeMovie"
  />
  </div>
</div>
</template>
 
<style>
/* header */
#header {
  background-image: url("../assets/header-movies.jpeg");
  background-size: cover;
  height: 400px;
}
</style>