<template>
  <div class="background">
      <Navbar/>
      <div class="container">
      <h1 class="text-center display-2">Level 1</h1>
      <h2 class="text-center display-3">The Tortoise and the Hare</h2>
      <p>
         Once upon a time there was a hare who spent all day bragging about how fast he could run. Tired of hearing him boast, the tortoise, challenged him to a race.<br>“You must be kidding!” said the hare laughing. “I am so much faster than you.”<br>“We shall see,” the tortoise replied.<br>The next day, the animals of the forest gathered to watch the race. Everyone wanted to see if the tortoise could beat the hare.The bear started the race yelling “On you mark, get set, go!”<br>The hare immediately raced ahead, running faster than ever. He looked back and saw the tortoise was only a few steps away from the starting line.<br>“Foolish tortoise, ” thought the hare. “He is so slow. Why would he want to race me if he has no chance to win?” Confident that he was going to win the race, the hare decided to stop in the middle of the road to rest under a tree. The cool and pleasant shade of the tree was very relaxing, so much so that the hare fell asleep.<br>Meanwhile, the tortoise continued walking slowly, but steady. He was determined not to give up. Soon, he found the hare sleeping peacefully.<br>The tortoise was winning the race! When the tortoise approached the finish line, all the animals in the forest began cheering with excitement. The noise woke the hare, who could not believe his eyes: the tortoise was crossing the finish line and he had lost the race. 
      </p>

      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    name: 'Level1',
    components: {
        Navbar
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
.background{
  background-image: linear-gradient(rgba(248,201,255,.5), rgba(252, 255, 41,.5)), url('../assets/yellownotes.jpg');
  background-size: cover;
    background-repeat: no-repeat;
	background-position: center;
  height: 100%;
}
p{
    font-family: 'Indie Flower', cursive;
    font-size: 24px;
    margin-left: 3em;
}
</style>