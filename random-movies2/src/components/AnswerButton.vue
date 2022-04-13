<script setup>
defineEmits(['checkAnswer'])
defineProps({
    movie: {
        type: Object,
        require: true
    }
})

const randMovie = () => {
    const rand = Math.floor(Math.random() * movieList)
}
</script>
 
<template>
<button id="answer-button" @click="emit('checkAnswer')">

</button>
</template>
 
<style>

</style>