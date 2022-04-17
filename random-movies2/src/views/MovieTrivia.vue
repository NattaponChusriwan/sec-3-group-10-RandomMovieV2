<script setup>
import { ref, computed, onBeforeMount } from "vue";
import BaseButton from "../components/BaseButton.vue";

const questions = ref([]);
const getQuestions = async () => {
  const res = await fetch("http://localhost:5000/questions");
  if (res.status === 200) {
    questions.value = await res.json();
  } else console.log("error, cannot get data");
};
onBeforeMount(async () => {
  await getQuestions();
});

const quizCompleted = ref(false);
const currentQuestion = ref(0);
const score = computed(() => {
  let value = 0;
  questions.value.map((q) => {
    if (q.selected != null && q.answer == q.selected) {
      value++;
    }
  });
  return value;
});
const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value];
  return question;
});
const SetAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value;
  e.target.value = null;
};
const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++;
    return;
  } else {
    quizCompleted.value = true;
  }
};

const restart = async () => {
  await getQuestions()
  currentQuestion.value = 0
  score.value = 0
  quizCompleted.value = false
}
</script>

<template>
  <div class="container" v-if="getCurrentQuestion">
    <div>
      <h1>The Quiz</h1>
      <section class="quiz" v-if="!quizCompleted">
        <div class="quiz-info">
          <span class="question">{{ getCurrentQuestion.question }}</span>
          <span class="score"> Score {{ score }}/{{ questions.length }}</span>
        </div>
        <div class="quiz-image">
          <img
            :src="getCurrentQuestion.image"
            :alt="getCurrentQuestion.question"
          />
        </div>
        <div class="options">
          <label
            v-for="(option, index) in getCurrentQuestion.options"
            :key="'option' + index"
            :class="`option ${
              getCurrentQuestion.selected == index
                ? index == getCurrentQuestion.answer
                  ? 'correct'
                  : 'wrong'
                : ''
            } ${
              getCurrentQuestion.selected != null &&
              index != getCurrentQuestion.selected
                ? 'disabled'
                : ''
            }`"
          >
            <input
              type="radio"
              :id="'option' + index"
              :name="getCurrentQuestion.index"
              :value="index"
              v-model="getCurrentQuestion.selected"
              :disabled="getCurrentQuestion.selected"
              @change="SetAnswer"
            />
            <span>{{ option }}</span>
          </label>
        </div>

        <button @click="NextQuestion" :disabled="!getCurrentQuestion.selected">
          {{
            getCurrentQuestion.index == questions.length - 1
              ? "Finish"
              : getCurrentQuestion.selected == null
              ? "Select an option"
              : "Next question"
          }}
        </button>
      </section>

      <section v-else>
        <h2>You have finished the quiz!</h2>
        <p>Your score is {{ score }}/{{ questions.length }}</p>
          <base-button buttonName="Restart" @click="restart" />
      </section>
    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Kanit", sans-serif;
}
.quiz-image {
  width: 75%;
  margin: 1rem auto;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  height: 100vh;
}

.quiz {
  padding: 1rem;
  width: 100%;
  max-width: 640px;
}
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.quiz-info .question {
  color: #8f8f8f;
  font-size: 1.25rem;
}
.quiz-info.score {
  color: #fff;
  font-size: 1.25rem;
}
.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #36361c;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.option:hover {
  color: black;
  background-color: #ecc712;
}

.option.correct {
  background-color: #2cce7d;
}

.option.wrong {
  background-color: #ff5a5f;
}

.option:last-of-type {
  margin-bottom: 0;
}

.option.disabled {
  opacity: 0.5;
}

.option input {
  display: none;
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
}

button:disabled {
  opacity: 0.5;
}
h1 {
  font-size: 2rem;
}
</style>
