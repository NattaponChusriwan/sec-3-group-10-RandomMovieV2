<script setup>
import { ref , onBeforeMount, computed } from 'vue'
import MovieList from '../components/BaseMovieList.vue'
import AddEditMovie from '../components/AddEditMovie.vue'
import IconsFiltering from '../components/SystemUiconsFiltering.vue'
import IconsAdding from '../components/IcOutlineNoteAdd.vue'
import BaseButton from '../components/BaseButton.vue'
import RandomResult from '../components/RandomResult.vue'

const movies = ref([])
const selectedMovies = ref ([])
const selectedGenre = ref('All')
const clickAddingIcon = ref(false)
const clickSelectGenreIcon = ref(false)
const showMovie = ref({})
const isModal = ref(false)

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
    body: JSON.stringify({ name: newMovie.name , genre: newMovie.genre , synopsis: newMovie.synopsis, imgPath:'../images/newMovie.gif' })
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
  clickAddingIcon.value = false
}

//PUT
const editMode = (editMovie) => {
  newestMovie.value = editMovie
  clickAddingIcon.value = true
}

const updateMovie = async (editingMovie) => {
  const res = await fetch(`http://localhost:5000/movies/${editingMovie.id}`, {
    method: 'PUT',
    headers:{
      'content-type' : 'application/json'
    },
    body: JSON.stringify({ name: editingMovie.name, genre: editingMovie.genre, imgPath: editingMovie.imgPath, synopsis: editingMovie.synopsis })
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

const isAddingIconClick = () => {
  if (clickAddingIcon.value === false) {
    clickAddingIcon.value = true
  } else {
    clickAddingIcon.value = false
  }
}

const isSelctGenreIconClick = () => {
  if (clickSelectGenreIcon.value === false) {
    clickSelectGenreIcon.value = true
  } else {
    clickSelectGenreIcon.value = false
  }
}

const sortGenre = computed(() => {
  const sortedGenre = movies.value.reduce((previous, current) => {
    previous[current.genre] = current
    return previous
  }, {})
  return Object.values(sortedGenre).sort((a, b) =>
    a.genre.localeCompare(b.genre)
  )
})

const filterGenre = computed(() => {
  if (selectedGenre.value === 'All') {
    return movies.value
  } else {
    return movies.value.filter((movie) => movie.genre === selectedGenre.value)
  }
})

const randomMovie = () => {
  if (selectedMovies.value.length !== 0) {
    const randSelect = Math.floor(Math.random() * selectedMovies.value.length)
    showMovie.value = selectedMovies.value[randSelect]
    isModal.value = true
  } else if (selectedGenre.value === 'All') {
    const randAll = Math.floor(Math.random() * movies.value.length)
    showMovie.value = movies.value[randAll]
    isModal.value = true
  } else {
    const randFilter = Math.floor(Math.random() * filterGenre.value.length)
    showMovie.value = filterGenre.value[randFilter]
    isModal.value = true
  }
}

const closeModal = (e) => {
  isModal.value = e
}

</script>
 
<template>
<div>
    <span  class="text-4xl font-bold">Movie Lists</span>
    <span class="flex justify-end"> 
      <base-button
        buttonName = 'Random'
        @click="randomMovie"
      />
    </span>
    <hr>
  </div>
  <div class="flex justify-end">
    <icons-adding @click="isAddingIconClick"/>
    <icons-filtering @click="isSelctGenreIconClick"/>
  </div>
  <div v-show="clickSelectGenreIcon">
    <h1>Select Genre</h1>
    <select id="select-bar" v-model="selectedGenre" class="select">
    <option option value="All">All recommended</option>
    <option v-for="movieGenre in sortGenre" :key="movieGenre.id">
      {{ movieGenre.genre }}
    </option>
    </select>
  </div>
  <div>
    <add-edit-movie 
    v-show="clickAddingIcon"
    @addMovie="createNewMovie" 
    :movies="newestMovie" 
    @updateMovie="updateMovie"
    @close="closeForm"
    />
    <hr>
  </div>
  
  <!-- Show result -->
  <div class="modal-content">
    <div class="modal" v-if="isModal">
      <random-result :movie="showMovie" @close="closeModal" @random="randomMovie"/>
    </div>
  </div>
  <!-- End Show result -->

  <div id="cards-recommend" class="grid grid-cols-1 gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2" >
    <!-- Show Movies -->
     <div v-for="filter in filterGenre" :key="filter.id" id="each-card" class="rounded-lg shadow-lg bg-white max-w-sm">
      <input type="checkbox" class="hidden" :id="filter.id" :name="filter.name" :value="filter" v-model="selectedMovies" />
      <label :for="filter.id">
        <movie-list
          :movie = "filter"
          @editMovie="editMode"
          @deleteMovie="removeMovie"
        />
      </label>
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
.div {
  height: 1000px;
  padding: 20px;
}
label {
  display: block;
  position: relative;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
label::before {
  content: ' ';
  display: block;
  border-radius: 50%;
  border: 2px solid red;
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 28px;
  transition-duration: 0.4s;
  transform: scale(0);
}
:checked + label {
  border-color: red;
  border-width: 3px;
  border-radius: 0.275rem;
}
:checked + label::before {
  content: '✓';
  background-color: red;
  transform: scale(1);
}
.select {
  border-style: solid;
  border-width: medium;
  border-color: red;
  border-radius: 8px;
  padding: 5px;
  color: black;
}
</style>