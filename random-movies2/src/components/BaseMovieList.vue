<script setup>
import BaseButton from './BaseButton.vue'
defineEmits(['deleteMovie', 'editMovie'])
defineProps({
    movie: {
        type: Object,
        require: true
    }
})

const scrollUp = () => {
      window.scrollTo(0,100);
}
</script>

<template>
  <div id="each-card" >
    <img class="rounded-t-lg" :src="movie.imgPath" :alt="movie.id"  />
      <div id="card-content" class="p-6">
        <h5 class="text-black text-xl font-medium mb-2 ">
          {{ movie.name }}
          <div class="scroll">
            <p class="text-blac text-base font-medium mb-2">
              {{ movie.synopsis }}
            </p>
          </div>
        </h5>
      </div>
    <base-button 
    buttonName = 'Edit'
    @click="$emit('editMovie', movie); scrollUp();"
    />
    <base-button 
    buttonName = 'Delete'
    @click="$emit('deleteMovie', movie.id)"
    />
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