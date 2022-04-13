<script setup>
defineProps({
    movies: {
        type: Array,
        require: true
    }
})
</script>

<template>
<div>
    <ul>
        <li v-for="movie in movies" :key="movie.id">
        <img :src="movie.imgPath" :alt="movie.name">
        <p>{{ movie.name }}</p> 
        <p>{{ movie.synopsis }}</p>
        <button>Edit</button>
        <button>Delete</button>
        </li>
        
    </ul>
    
</div>
</template>
 
<style>

</style>