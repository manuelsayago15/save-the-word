<template>
<div class="background">
        <!-- Tercer cuento -->
            <Navbar/>
    <div class="container">
            <h1 class="text-center display-2">Level 2</h1>
        <div v-if="!show">
            <h2 class="text-center display-3">Foolish Imitation</h2>
            <HighlightTable @share="onShare" @highlight="onHighlight">
                <p>
                    Long ago, a hawk lived on the top of a hill. At the foot of the hill there was a banyan tree on which a crow used to perch everyday. The crow was very foolish. He would imitate everyone.<br>The hawk atop the hill would fly down everyday in search of food. The crow watched the hawk circling in the air for long hours and swooping down when he saw his prey. The hawk gifted with eyes that could see long distances would spot his prey from the hill top and then fly down to pounce upon the prey.<br>The crow watched the hawk thinking, “Hunh! If the hawk can do that, I too can. What does he think? One day, I will show the hawk that I can do the same thing."<br>A few days later, as the hawk was circling in the air, the crow decided to do the same. Suddenly a baby rabbit came out of the bushes. The hawk saw it and the crow too saw the rabbit.<br>Before the crow could move, the hawk swooped down, caught hold of the rabbit in his strong sharp talons and flew away. “Swoosh!" was all the crow heard as the hawk disappeared in the sky with his prey. “Hmmph! That is no great skill," thought the crow, angrily.<br>Next moment he spotted a big fat mouse coming out of a hole. Without wasting time, the crow swooped down. Like the hawk he tried to catch the mouse in his claws.<br>But the mouse saw the crow and moved away, the crow crashed against the hill. “Eeeaaa!" cried the crow in pain.<br>Just then the hawk came flying down. “I hope, now you know it is not easy to hunt and it is not easy to imitate, either," said the hawk and flew away.<br>There after, the crow never imitated any one in its life. It lived happily with the god-given abilities. 
                </p>
            </HighlightTable>
        </div>
        <div class="text-center" v-if="!show">
            <b-button @click="quiz" size="lg" class="my-5" variant="light">Go to quiz</b-button>
        </div>
    </div>
    <div v-if="show">
        <div class="card container text-center">
            <div class="card-header">
                <h3 class="my-5">Did the crow learned his lesson?</h3>
            </div>
            <div class="card-body">
                <div class="form-check form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck1">Yes</label>
                    <input @change="good" class="form-check-input" type="radio" value="true" id="defaultCheck1">
                </div>
                <div class="form-check  form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck2">No</label>
                    <input @change="bad" class="form-check-input" type="radio" value="false" id="defaultCheck2">
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
import { mapMutations, mapActions } from "vuex";
import HighlightTable from "@/components/HighlightTable";
export default {
    name: 'Level2-1',
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
        ...mapMutations(['saveWord']),
        ...mapActions(['getWord']),
        quiz(){
            this.show= true
        },
        good(){
            Swal.fire({
            icon: 'success',
            title: 'Great job!!',
            confirmButtonAriaLabel: 'Thanks:D'
            })
            this.$router.push('/levels/2/2')
        },
        bad(){
            Swal.fire({
            icon: 'error',
            title: 'Try again',
            confirmButtonAriaLabel: 'Okay:c'
            })
        },
        goBack(){
            this.$router.go()
        },
        onShare(text) {
            console.log("share:", text);
            this.getWord(text);
            this.$notify({
            title: 'Success',
            message: 'Word added successfully',
            type: 'success'
            });
        },
        onHighlight(text) {
            console.log("highlight:", text);
        },
    },
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
@media (max-width: 768px) { 
    h2{
        font-size: 3.5rem;
    }
    p{
        margin-left: 1em;
    }
}   
</style>