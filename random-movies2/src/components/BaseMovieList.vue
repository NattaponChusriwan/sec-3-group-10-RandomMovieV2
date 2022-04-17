<script setup>
import { ref, computed } from 'vue'
import BaseButton from './BaseButton.vue'
import IconsDropDown from './DropDownIcon.vue'
defineEmits(['deleteReview', 'editReview', 'showReview', 'cancel', 'updateReview', 'addReview', 'deleteMovie', 'editMovie', 'isClicked'])
const props = defineProps({
    movie: {
      type: Object,
      require: true
    },
    reviews: {
      type: Array,
      default: []
    },
    editNewReview: {
      type: Object,
      default: {}
    }
})

const isClick = ref(false)

const newReview = computed(() => {
  return {
    id: props.editNewReview.id,
    movieId: props.editNewReview.movieId,
    review: props.editNewReview.review
  }
}) 

const scrollUp = () => {
      window.scrollTo(0,100);
}
</script>

<template>
<div>
  <div id="each-card" class="rounded-lg shadow-lg bg-white max-w-sm">
    <img class="rounded-t-lg" :src="movie.imgPath" :alt="movie.id"  />
      <div id="card-content" class="p-6">
        <h5 class="text-black text-xl font-medium mb-2">
          {{ movie.name }}
          <div class="scroll1">
            <p class="text-black text-base font-medium mb-2">
              {{ movie.synopsis }}
            </p>
          </div>
        </h5>
      </div>
    <div class="flex justify-between">
      <div class="flex">
        <base-button 
        buttonName = 'Edit'
        @click="$emit('editMovie', movie); scrollUp();"
        />
        <base-button 
        buttonName = 'Delete'
        @click="$emit('deleteMovie', movie.id)"
        class="mr-6"
        />
      </div>
      <button class="inline-flex items-center" @click="isClick = !isClick">
        <span class="text-gray-400 text-base font-medium mb-2">More Reviews</span>
        <icons-drop-down class="mr-3"/>
      </button>
    </div>
    <div v-show="isClick" class="rounded-md m-3">
      <p class="text-black text-xl font-medium mb-2 ">Reviews</p>
      <div class="text-black text-base font-medium mb-2">
        <span>Your Review: </span>
        <input type="text" class="border" v-model="newReview.review"> <br>
        <div class="mt-5">
          <base-button
          v-if="newReview.id > 0" 
          buttonName="Save"
          @click="$emit('updateReview', newReview)" 
        />
        <base-button 
          v-else
          buttonName="Post" 
          @click="$emit('addReview', {movieId: movie.id, review: newReview.review})"
        />
        <base-button
          v-if="newReview.id > 0" 
          buttonName="Cancel"
          @click="$emit('cancel')" 
        />
        </div>
      </div>
      <div class="scroll2 ">
        <p v-for="review in reviews" :key="review.id" class="bg-gray-100 text-black text-base font-medium mb-2 p-2" >
         {{ review.review }}  <br>
          <div class="mt-4">
            <base-button buttonName="Edit" @click="$emit('editReview', review)"/>
            <base-button buttonName="Delete" @click="$emit('deleteReview', review.id)"/>
          </div>
          <hr>
        </p>
      </div>
    </div>
  </div>
</div>
</template>
 
<style>
.scroll1 {
  overflow-y: scroll,hidden;
  overflow-x: hidden;
  width: 106%;
  height: 150px;
}

.scroll2 {
  overflow-y: scroll,hidden;
  overflow-x: hidden;
  width: 99%;
  height: 150px;
}

.rounded-t-lg{
  width: 100%;
  height: 650px;
  object-fit: cover;
}

</style>