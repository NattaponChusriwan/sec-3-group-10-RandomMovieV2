<script setup>
import { computed , ref } from 'vue'
defineEmits(['updateMovie', 'addMovie' , 'close'])
const props = defineProps({
  movies: {
    type: Object,
    default: {}
  }
})


const newMovie = computed(() => {
  return {
    id: props.movies.id,
    name: props.movies.name,
    genre: props.movies.genre,
    synopsis: props.movies.synopsis,
    imgPath: props.movies.imgPath 
  }
})

</script>
 
<template>
<div>
  <h1 class="text-3xl font-bold	">Add Movie</h1>
  <p>Movie name: <input type="text" class="border-2 border-yellow-500 text-black ml-1 mt-2	" v-model="newMovie.name"></p>
  <p>Genre: <select  class="border-2 border-yellow-500 text-black ml-12 mt-2	" v-model="newMovie.genre">
  <option disabled value="" >Please select one</option>
  <option>Action</option>
  <option>Animation</option>
  <option>Comedy</option>
  <option>Drama</option>
  <option>Fantasy</option>
  <option>Horror</option>
  <option>K-Drama</option>
  <option>Mystery</option>
  <option>Romantic</option>
    </select>
  </p>
    <div class="div-containter-input">
      <div class="div-input">
        <label class="mt-1">Synopsis :</label>
       <textarea cols="100" rows="10" placeholder="input your synopsis here..." type="text" 
       class="border-2 border-yellow-500 text-black ml-7  mt-2	" v-model="newMovie.synopsis">
          </textarea>
          </div> 
          </div>
  
  <button v-if="newMovie.id > 0" @click="$emit('updateMovie', newMovie)" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Save</button>
  <button v-else @click="$emit('addMovie', {name: newMovie.name, genre: newMovie.genre, synopsis: newMovie.synopsis, imgPath: newMovie.imgPath})" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Add</button>
  <button @click="$emit('close')" class="text-yellow-500 bg-transparent border border-solid border-yellow-500 hover:bg-yellow-500 hover:text-black active:bg-yellow-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Close</button>
</div>
</template>
 
<style >
.div-contatiner-input {
  display: flex;
  flex-direction: column;
}
.div-input {
  display: flex;
  align-items: top;
}
</style>