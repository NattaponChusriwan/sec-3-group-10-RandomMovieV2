<script setup>
import { computed } from 'vue'
import BaseButton from '../components/BaseButton.vue'
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
  <h1 class="text-3xl font-bold mb-3	">Add Movie</h1>
  <p>Movie name : <input type="text" class="border-2 border-red-500 text-black ml-1 mt-2	" v-model="newMovie.name" ></p>
  <p>Genre : <select  class="border-2 border-red-500 text-black ml-12 mt-2	" v-model="newMovie.genre" >
  <option disabled >Please select one</option>
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
        <label class="mt-1 ">Synopsis :</label>
       <textarea cols="100" rows="10" placeholder="input your synopsis here..." type="text" 
       class="border-2 border-red-500 text-black ml-7  mt-2	" v-model="newMovie.synopsis" >
          </textarea>
          </div> 
          </div>
   <div class="mt-5 ml-24 mb-4">
     <base-button
        buttonName = 'Save'
        @click="$emit('updateMovie', newMovie)"
        v-if="newMovie.id > 0"
      />
     <base-button
        buttonName = 'Add'
        @click="$emit('addMovie', {name: newMovie.name, genre: newMovie.genre, synopsis: newMovie.synopsis, imgPath: newMovie.imgPath})"
        v-else
      />
      <base-button
        buttonName = 'Close'
        @click="$emit('close')"
      />
   </div>
</div>
</template>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
* {
  font-family: "Kanit", sans-serif;
}
.div-contatiner-input {
  display: flex;
  flex-direction: column;
}
.div-input {
  display: flex;
  align-items: top;
}
</style>