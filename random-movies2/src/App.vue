<script setup>

</script>

<template>
<div>
    <router-link :to="{name:'Home'}">Home</router-link> | 
    <router-link :to="{name:'AddMovie'}">Add Movie</router-link> | 
    <router-link :to="{name:'AboutUs'}">About Us</router-link>
</div>
<div>
    <router-view></router-view>
</div>
</template>
 
<style>

</style>
