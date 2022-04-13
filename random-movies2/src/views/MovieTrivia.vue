<script setup>
import { ref } from 'vue';

// const isStart = ref(true[])

const checkAnswer = () => {
}

</script>

<template>
  <div id="container" @click="">
    <button>
        Start your freaking Game
    </button>
    <div id="question-container">
      <div id="question">Question #indexhere: Guest Scene from this picture
          [ Picture ]
      </div>
      <div id="answer">
          <ul>
              <li v-for='(index) in 4' :key="index">
              <button>
                  {{index}}
              </button>
              </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
