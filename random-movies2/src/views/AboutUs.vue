<script setup></script>

<template>
  <div class="about">
    <h1>About Us</h1>
    <p>
      This website for Random movie sites to solve problems 'What's a good movie
      to watch today?', It develops by
    </p>
    <ul>
      <li>1. Orawan Srakaew 63130500132</li>
      <li>2. Thunnavat Chudam 63130500142</li>
      <li>3. Nattapon Chusriwan 63130500154</li>
      <li>4. Todsawat Somtua 63130500155</li>
      <li>5. Supphakorn Praisakuldecha 63130500158</li>
    </ul>
  </div>
<div class="text-gray-500 flex justify-center my-20">
        <p>© INT203 Client-Side Programming : Sec3-Group10</p>
</div>


</template>

<style scoped>
.about {
    font-size: 2.4vh;
    text-align: center;
}

.container {
    display: flex;
    width: 100%;
    padding: 0% 2%;
    box-sizing: border-box;
    height: 55vh;
}
.box {
    flex: 1;
    overflow: hidden;
    transition: .5s;
    margin: 0 2%;
    box-shadow: 0 20px 30px rgba(0,0,0,.1);
    line-height: 0;
}
  
.box img {
    width: 90%;
    object-fit: cover; 
    transition: .5s;
}
  
.box span {
    display: block;
    text-align: center;
    height: 10vh;
    line-height: 2.6;
    background-color: rgba(255, 255, 255, 0.8);
}

</style>
