<template>
<div class="background">
    <Navbar/>
    <div class="container">
         <h1 class="text-center display-2">Level 1</h1>
        <div v-if="!show">
            <h2 class="text-center display-3">The Boy Who Cried Wolf</h2>
            <HighlightTable @share="onShare" @highlight="onHighlight">
                <p>
                    There was once a little shepherd taking care of his flock on the top of a hill. He was very bored. To amuse himself he took a great breath and sang out, “Wolf! Wolf! The Wolf is chasing the sheep!”<br>The villagers came running to help the little shepherd and drive away the wolf. But when they reached the top of the hill they did not find any wolves. Instead, they found the little shepherd laughing.<br>“Don't cry 'wolf when there's no wolf,” said the villagers and they left angry down the hill.<br>After a few hours, the little shepherd, finding himself once again very bored, shouted, “Wolf, wolf! There is a wolf chasing the sheep.”<br>The villagers ran again to help him, but seeing that there were no wolves, they told the shepherd very angrily, “Don't cry wolf when there is no wolf. Do it only when a wolf is truly chasing the sheep.”<br>Having tricked the villagers once again, the shepherd boy was rolling on the ground with laughter as he watched the villagers go down the hill.<br>Later, the little shepherd saw a wolf near his flock. Scared, he shouted as loud as he could.<br>“Wolf, wolf! There is a wolf chasing the sheep.”<br>But the villagers thought he was trying to trick them again, and this time they did not come to his aid. The little shepherd cried inconsolably as he watched the wolf run away with all his sheep.<br>At dusk, the little shepherd returned to the village and told everyone, “The wolf a on the hill and has taken all my sheep. Why did you not help me?”<br>Then, the villagers responded, “We would have helped you, just like we did before, but nobody believes in a liar even when he is telling the truth.”
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
                <h3 class="my-5">The villagers believed the boy at the end?</h3>
            </div>
            <div class="card-body">
                <div class="form-check form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck1">True</label>
                    <input @change="good" class="form-check-input" type="radio" value="true" id="defaultCheck1">
                </div>
                <div class="form-check  form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck2">False</label>
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
name:'Level1-2',
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
            this.$router.push('/levels/2/1')
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