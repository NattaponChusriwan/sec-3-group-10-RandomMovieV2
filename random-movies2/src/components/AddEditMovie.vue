<script setup>
import { computed , ref } from 'vue'
defineEmits(['updateMovie', 'addMovie' , 'close'])
const props = defineProps({
  movies: {
    type: Object,
    default: {}
  }
})

const selectGenre = ref('All')

const newMovie = computed(() => {
  return {
    id: props.movies.id,
    name: props.movies.name,
    genre: props.movies.genre,
    synopsis: props.movies.synopsis,
    imgPath: props.movies.imgPath !== '' ? props.movies.imgPath : '../images/newMovie.png'
  }
})
</script>
 
<template>
<div>
  <p>Add Movie</p>
  <p>Movie name: <input type="text" class="border-2 border-yellow-500 text-black	" v-model="newMovie.name"></p>
  <p>Genre: <input type="text"  class="border-2 border-yellow-500 text-black	" v-model="newMovie.genre"></p>
  <p>Synopsis: <input type="text" class="border-2 border-yellow-500 text-black	" v-model="newMovie.synopsis"></p>
  <button v-if="newMovie.id > 0" @click="$emit('updateMovie', newMovie)" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Save</button>
  <button v-else @click="$emit('addMovie', {name: newMovie.name, genre: newMovie.genre, synopsis: newMovie.synopsis, imgPath: newMovie.imgPath})" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Add</button>
  <button @click="$emit('close')" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Close</button>
</div>
</template>
 
<style >

</style>