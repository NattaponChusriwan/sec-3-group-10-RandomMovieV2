<script setup>
defineProps({
    buttonName: {
        type: String,
        require: true
    },
    buttonColor: {
        type: String
    }
})

</script>
 
<template>
<button class="base-button ml-3 mb-4 bg-transparent border border-solid text-red-500 border-red-500 hover:bg-red-500 hover:text-black active:bg-red-600 font-bold uppercase text-sm py-3 rounded outline-none focus:outline-none ease-linear transition-all duration-150 active show px-3">
  {{ buttonName }}
</button>
</template>
 
<style>
</style>
