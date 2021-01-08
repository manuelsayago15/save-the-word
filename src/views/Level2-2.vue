<template>
<div class="background">
        <!-- Cuarto cuento -->
            <Navbar/>
    <div class="container">
            <h1 class="text-center display-2">Level 2</h1>
        <div v-if="!show">
            <h2 class="text-center display-3">Bad Temper</h2>
            <HighlightTable @share="onShare" @highlight="onHighlight">
                <p>
                    There once was a little boy who had a bad temper. His father gave him a bag of nails and told him that every time he lost his temper, he must hammer a nail into the back of the fence.<br><br>The first day, the boy had driven 37 nails into the fence. Over the next few weeks, as he learned to control his anger, the number of nails hammered daily gradually dwindled down. He discovered it was easier to hold his temper than to drive those nails into the fence.<br><br>Finally the day came when the boy didn't lose his temper at all. He told his father about it and the father suggested that the boy now pull out one nail for each day that he was able to hold his temper. The days passed and the boy was finally able to tell his father that all the nails were gone.<br><br>The father took his son by the hand and led him to the fence. He said, "You have done well, my son, but look at the holes in the fence. The fence will never be the same. When you say things in anger, they leave a scar just like this one. You can put a knife in a man and draw it out. It won't matter how many times you say I'm sorry. The wound is still there."
                </p>
            </HighlightTable>
        </div>
        <div class="text-center" v-if="!show">
            <b-button id="quiz" @click="quiz" size="lg" class="my-5" variant="light">Go to quiz</b-button>
        </div>
    </div>
    <div v-if="show">
        <div class="card container text-center">
            <div class="card-header">
                <h3 class="my-5">How many nails did the fence had at the end?</h3>
            </div>
            <div class="card-body">
                <div class="form-check form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck1">50</label>
                    <input @change="bad" class="form-check-input" type="radio" value="true" id="defaultCheck1">
                </div>
                <div class="form-check  form-check-inline text-center">
                    <label class="form-check-label mr-2" for="defaultCheck2">0</label>
                    <input @change="good" class="form-check-input" type="radio" value="false" id="defaultCheck2">
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
import { mapMutations, mapActions, mapState } from "vuex";
import HighlightTable from "@/components/HighlightTable";
import $ from 'jquery'

export default {
    name: 'Level2-2',
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
        ...mapActions(['getWord', 'setLevel']),
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
            this.setTale(false);
            const level = 2;
            const tale = 2;
            this.setLevel({level: level, tale: tale});
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
        ...mapState(['wordExist', 'same']),
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
  height: 170vh;
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