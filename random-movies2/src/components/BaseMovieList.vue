<script setup>
defineEmits(['deleteMovie', 'editMovie'])
defineProps({
    movie: {
        type: Object,
        require: true
    }
})
</script>

<template>
  <div id="each-card" class="rounded-lg shadow-lg bg-white max-w-sm">
    <img class="rounded-t-lg" :src="movie.imgPath" :alt="movie.id"/>
      <div id="card-content" class="p-6">
        <h5 class="text-black text-xl font-medium mb-2">
          {{ movie.name }}
          <div class="scroll">
            <p class="text-blac text-base font-medium mb-2">
            {{ movie.synopsis }}
            </p>
          </div>
        </h5>
      </div>
    
    <button @click="$emit('editMovie', movie)" class="ml-4  text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-black active:bg-red-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Edit</button>
    <button @click="$emit('deleteMovie', movie.id)" class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-black active:bg-red-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 active show px-3">Delete</button>
    
  </div>
</template>
 
<style >
.scroll {
  overflow-y: scroll,hidden;
  overflow-x: hidden;
  width: 105%;
  height: 150px;
}
.rounded-t-lg{
  width: 100%;
  height: 650px;
  object-fit: cover;
}
</style>