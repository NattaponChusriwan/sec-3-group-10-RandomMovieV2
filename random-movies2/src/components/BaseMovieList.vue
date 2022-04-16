<script setup>
import { ref, computed } from 'vue'
import BaseButton from './BaseButton.vue'
import IconsDropDown from './DropDownIcon.vue'
defineEmits(['deleteReview', 'editReview', 'showReview', 'cancel', 'updateReview', 'addReview', 'deleteMovie', 'editMovie'])
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
  console.log(props.editNewReview)
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
  <div id="each-card" >
    <img class="rounded-t-lg" :src="movie.imgPath" :alt="movie.id"  />
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
    <div class="flex justify-end">
      <base-button 
      buttonName = 'Edit'
      @click="$emit('editMovie', movie); scrollUp();"
      />
      <base-button 
      buttonName = 'Delete'
      @click="$emit('deleteMovie', movie.id)"
      />
      <icons-drop-down @click="isClick = !isClick"/>
    </div>
    <div v-show="isClick">
      <p class="text-black text-base font-medium mb-2">Reviews</p>
      <div class="text-black text-base font-medium mb-2">
        <span>Your Review: </span>
        <input type="text" class="border" v-model="newReview.review">
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
      <div class="scroll">
        <p v-for="review in reviews" :key="review.id" class="text-black text-base font-medium mb-2">
          {{ review.review }}
          <base-button buttonName="Edit" @click="$emit('editReview', review)"/>
          <base-button buttonName="Delete" @click="$emit('deleteReview', review.id)"/>
          <hr>
        </p>
      </div>
    </div>
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