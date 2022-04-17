<script setup>
import BaseButton from './BaseButton.vue'
defineEmits(['random','close'])
defineProps({
    movie: Object
})

</script>

<template>
<div class="modal-mask">
    <div class="modal-wrapper">
        <div class="modal-container">
            <div class="modal-header text-lg font-bold" >
                <h3>Random Result: {{ movie.name }}</h3>
            </div>
            <div class="modal-body ">
                <img :src="movie.imgPath" :alt="movie.id">
            </div>
            <div class="modal-button text-black flex justify-end">
                <base-button buttonName='Random' @click="$emit('random')"></base-button>
                <base-button buttonName='Close' @click="$emit('close', false)">Close</base-button>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
* {
  font-family: "Kanit", sans-serif;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 400px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: rgb(0, 0, 0);
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
    margin-top: 0;
    color: red;
}

.modal-body {
    margin: 20px 0;
}

.modal-button {
    display: flex;
    justify-content: end;
}

</style>