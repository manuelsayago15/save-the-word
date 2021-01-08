<template>
  <div class="background">
    <!-- Primer cuento -->
    <Navbar />
    <div class="container">
      <h1 id="test" class="text-center display-2">Level 1</h1>
      <div v-if="!show">
        <h2 class="text-center display-3">The Tortoise and the Hare</h2>
        <HighlightTable @share="onShare" @highlight="onHighlight">
          <p>
            Once upon a time there was a hare who spent all day bragging about
            how fast he could run. Tired of hearing him boast, the tortoise,
            challenged him to a race.<br />“You must be kidding!” said the hare
            laughing. “I am so much faster than you.”<br />“We shall see,” the
            tortoise replied.<br />The next day, the animals of the forest
            gathered to watch the race. Everyone wanted to see if the tortoise
            could beat the hare.The bear started the race yelling “On you mark,
            get set, go!”<br />The hare immediately raced ahead, running faster
            than ever. He looked back and saw the tortoise was only a few steps
            away from the starting line.<br />“Foolish tortoise, ” thought the
            hare. “He is so slow. Why would he want to race me if he has no
            chance to win?” Confident that he was going to win the race, the
            hare decided to stop in the middle of the road to rest under a tree.
            The cool and pleasant shade of the tree was very relaxing, so much
            so that the hare fell asleep.<br />Meanwhile, the tortoise continued
            walking slowly, but steady. He was determined not to give up. Soon,
            he found the hare sleeping peacefully.<br />The tortoise was winning
            the race! When the tortoise approached the finish line, all the
            animals in the forest began cheering with excitement. The noise woke
            the hare, who could not believe his eyes: the tortoise was crossing
            the finish line and he had lost the race.
          </p>
        </HighlightTable>
      </div>
      <div class="text-center" v-if="!show">
        <b-button id="quiz" @click="quiz" size="lg" class="my-5" variant="light"
          >Go to quiz</b-button
        >
        <!-- <b-button @click="test" size="lg" class="my-5" variant="light">TEST</b-button> -->
      </div>
    </div>
    <div v-if="show">
      <div class="card container text-center">
        <h2></h2>
        <a id="button"></a>
        <div class="card-header">
          <h3 class="my-5">Did the turtle win the race?</h3>
        </div>
        <div class="card-body">
          <div class="form-check form-check-inline text-center">
            <label class="form-check-label mr-2" for="defaultCheck1"
              >True</label
            >
            <input
              @change="good"
              class="form-check-input"
              type="radio"
              value="true"
              id="defaultCheck1"
            />
          </div>
          <div class="form-check form-check-inline text-center">
            <label class="form-check-label mr-2" for="defaultCheck2"
              >False</label
            >
            <input
              @change="bad"
              class="form-check-input"
              type="radio"
              value="false"
              id="defaultCheck2"
            />
          </div>
        </div>
        <b-button @click="goBack">Try Again</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Swal from 'sweetalert2'
import HighlightTable from "@/components/HighlightTable";
import { mapState, mapMutations, mapActions } from "vuex";
import $ from 'jquery'
export default {
    name: 'Level1-1',
    components: {
        HighlightTable,
        Navbar
    },
    data() {
        return {
            show: false,        
        }
    },
    methods: {
        ...mapMutations(['saveWord', 'setTale']),
        ...mapActions(['getWord', 'setWordDB', 'getWordDB', 'setLevel']),
        quiz(){
            this.show= true
            $(window).scrollTop(0);
        },
        good(){
            Swal.fire({
            icon: 'success',
            title: 'Great job!!',
            confirmButtonAriaLabel: 'Thanks:D'
            })
            //this.showLevels = parseInt(this.showLevels) + parseInt(1);
            //console.log("Showlevels good answer: " + this.showLevels);
            this.setTale(true);
            const level = 1;
            const tale = 1;
            this.setLevel({level: level, tale: tale});
            this.$router.push('/levels/1/2');
        },
        bad(){
            Swal.fire({
                icon: 'error',
            title: 'Try again',
            confirmButtonAriaLabel: 'Okay:c'
            })
            this.showLevels = 0;
            console.log("Showlevels bad answer: " + this.showLevels);
        },
        goBack(){
            this.$router.go();
        },

        onShare(text) {
            //console.log("share:", text);
            this.getWord(text);
            setTimeout( () => { 
                if(this.wordExist == true && this.same == false){
                    this.$notify({
                    title: 'Success',
                    message: 'Word added successfully',
                    type: 'success'
                    }); 
                }}, 1000);
        },
        onHighlight(text) {
            console.log("highlight:", text);
        },
    },

    computed: {
        ...mapState(['word', 'words', 'wordsArray', 'wordExist', 'same', 'showLevels']),
    },
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
.background {
  background-image: linear-gradient(
      rgba(248, 201, 255, 0.5),
      rgba(252, 255, 41, 0.5)
    ),
    url("../assets/yellownotes.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 170vh;
}
p {
  font-family: "Indie Flower", cursive;
  font-size: 24px;
  margin-left: 3em;
}
@media (max-width: 768px) {
  h2 {
    font-size: 3.5rem;
  }
  p {
    margin-left: 1em;
  }
}
</style>