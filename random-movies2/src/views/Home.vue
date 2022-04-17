<script setup>
import { ref , onBeforeMount, computed } from 'vue'
import MovieList from '../components/BaseMovieList.vue'
import AddEditMovie from '../components/AddEditMovie.vue'
import IconsFiltering from '../components/FilterIcons.vue'
import IconsAdding from '../components/AddIcons.vue'
import BaseButton from '../components/BaseButton.vue'
import RandomResult from '../components/RandomResult.vue'

const movies = ref([])
const reviews = ref([])
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

const getReviews = async () => {
  const res = await fetch('http://localhost:5000/reviews')
  if (res.status === 200) {
    reviews.value = await res.json()
  } else console.log('error, cannot get data')
}
onBeforeMount(async () => {
  await getReviews()
})

// DELETE
const removeMovie = async (deleteMovieId) => {
  if (confirm(`Do you want to delete movie-id: ${deleteMovieId} `) == true) {
    const res = await fetch(`http://localhost:5000/movies/${deleteMovieId}`, {
    method: 'DELETE'
    })
    if (res.status === 200) {
      movies.value = movies.value.filter((movie) => movie.id !== deleteMovieId)
      console.log('deleted successfully')
    } else console.log('error, cannot delete data')
  } else {
    console.log('cancel')
  }
}

const removeReview = async (deleteReviewId) => {
  if (confirm("Do you want to delete this Review") == true) {
    const res = await fetch(`http://localhost:5000/reviews/${deleteReviewId}`, {
    method: 'DELETE'
    })
    if (res.status === 200) {
      reviews.value = reviews.value.filter((review) => review.id !== deleteReviewId)
      console.log('deleted successfully')
    } else console.log('error, cannot delete data')
  } else {
    console.log('cancel')
  }
}

//POST
const newestMovie = ref({})
const createNewMovie = async (newMovie) => {
  if (newMovie.name === undefined || newMovie.genre === undefined) {
    alert('please insert Movie Name and Genre')
  } else {
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
    alert('Added Successfully')
    } else ('error, cannot added')
    newestMovie.value = {}
  }
}

const closeForm = () => {
  newestMovie.value = {}
  clickAddingIcon.value = false
}

const newestReview = ref({})
const createNewReview = async (newReview) => {
  if (newReview.review === undefined ) {
    alert('please insert Review')
  } else {
    const res = await fetch('http://localhost:5000/reviews', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ movieId: newReview.movieId , review: newReview.review })
    })
    if(res.status === 201) {
      const addedReview = await res.json()
      reviews.value.push(addedReview)
      alert('Post Successfully')
    } else console.log('error, cannot added')
    newestReview.value = {}
  }
}
const cancelReview = () => {
  newestReview.value = {}
}

//PUT
const editMovieMode = (editMovie) => {
  newestMovie.value = editMovie
  clickAddingIcon.value = true
}

const updateMovie = async (editingMovie) => {
  if (editingMovie.name === "" ) {
    alert('please insert Movie Name and Genre')
  } else {
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
}
const editReviewMode = (editReview) => {
  newestReview.value = editReview
}

const updateReview = async (editingReview) => {
  if (editingReview.name === "" ) {
    alert('please insert Review')
  } else {
    const res = await fetch(`http://localhost:5000/reviews/${editingReview.id}`, {
    method: 'PUT',
    headers:{
      'content-type' : 'application/json'
    },
    body: JSON.stringify({ movieId: editingReview.movieId, review: editingReview.review })
    })
    if (res.status === 200) {
      const editedReview = await res.json()
      reviews.value = reviews.value.map((review) => 
      review.id === editedReview.id 
      ? {...review, movieId: editedReview.movieId, review: editedReview.review} 
      : review
      )
    } else console.log('error, cannot be added')
    cancelReview()
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

const filterReview = (movieId) => {
  return reviews.value.filter((review) => review.movieId === movieId)
}

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

const resetSelected = () => {
  selectedMovies.value.length = 0
}

</script>
 
<template>
<div class="mx-20">
  <div class="mt-4 flex justify-between">
    <span class="text-4xl font-bold font">Movie Lists</span>
    <span>
      <base-button
        buttonName = 'Random'
        @click="randomMovie"
      />
      <base-button
        buttonName = 'Reset'
        @click="resetSelected"
        v-show="selectedMovies.length !== 0 "
      />
    </span>
  </div>
  <hr class="border border-solid">
  <div class="flex justify-end content-center">
    <span @click="clickAddingIcon = !clickAddingIcon" class="mt-3 mb-3 inline-flex items-center font-bold">
      <span style="cursor: pointer;" >Add Movie</span>
      <icons-adding class="ml-2"/>
    </span>
    <span @click="clickSelectGenreIcon = !clickSelectGenreIcon" class="mt-3 ml-5 mb-3 inline-flex items-center font-bold">
      <span style="cursor: pointer;">More Filter</span>
      <icons-filtering class="ml-2"/>
    </span>
  </div>
  <div v-show="clickSelectGenreIcon" class="flex justify-end ">
    <h1 class="text-3xl font-bold mt-3 mb-3 mr-4">Select Genre</h1>
    <select id="select-bar" v-model="selectedGenre" class="select ml-4 mb-6 mt-3 bg-transparent text-red-500">
    <option option value="All" class="bg-black text-red-500 ">All</option>
    <option v-for="movieGenre in sortGenre" :key="movieGenre.id" class="bg-black text-red-500" >
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
    <hr class="border border-solid">
  </div>
  
  <!-- Show result -->
  <div class="modal-content">
    <div class="modal" v-if="isModal">
      <random-result :movie="showMovie" @close="closeModal" @random="randomMovie"/>
    </div>
  </div>
  <!-- End Show result -->

  <!-- Show Movies -->
  <div id="cards-recommend" class="grid grid-cols-1 gap-4 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 mb-20 mt-4" >
     <div v-for="filter in filterGenre" :key="filter.id" id="each-card" class="rounded-lg shadow-lg max-w-sm">
      <input type="checkbox" class="hidden" :id="filter.id" :name="filter.name" :value="filter" v-model="selectedMovies"   />
      <label :for="filter.id">
        <movie-list
          :movie = "filter"
          :reviews = "filterReview(filter.id)"
          :editNewReview = "newestReview"
          @editMovie="editMovieMode"
          @deleteMovie="removeMovie"
          @deleteReview="removeReview"
          @editReview="editReviewMode"
          @cancel="cancelReview"
          @updateReview="updateReview"
          @addReview="createNewReview"
        />
      </label>
    </div>
  </div>
</div>

</template>
 
<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.selectgenre {
  font-family: "Kanit", sans-serif;
  color: red;
}

  * {
    font-family: "Kanit", sans-serif;
  }
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