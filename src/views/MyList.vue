<template>
    <div class="background">
    <Navbar/>
         <div class="container">
            <div class="row my-4">
                <div class="col-lg-8">
                    <h1 class="ml-5">MY LIST</h1>
                </div>
                <div class="col-lg-4 input-search">
                    <input type="text" v-model="wordInput" ref="search" placeholder="Search a word" 
                        @keyup="save()" 
                        @change="getWord($refs.search.value)">
                </div>
                
            </div>
        </div>
        <table class="table">
            <thead>
                <tr>
                <th scope="col">WORD</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">EXAMPLE</th>
                <th scope="col">AUDIO</th>
                <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <!-- <tbody v-for="(word, index) in words" :key="index">
                <tr>
                <th scope="row">{{word.wordData}}</th>
                <td>{{word.meaning}}</td>
                <td>{{word.example}}</td>
                <td>
                    <b-icon icon="play-circle-fill" aria-hidden="true"></b-icon>
                    {{word.audio}}</td>
                    <td><b-icon icon="trash" aria-hidden="true"></b-icon></td>
                </tr>
            </tbody> -->
            <tbody v-for="(word, index) in wordsArray" :key="index">
                <tr>
                <th scope="row">{{word.wordData}}</th>
                <td>{{word.meaning}}</td>
                <td>{{word.example}}</td>
                <td>
                    <b-icon icon="play-circle-fill" aria-hidden="true"></b-icon>
                    {{word.audio}}</td>
                    <td><b-icon icon="trash" aria-hidden="true"></b-icon></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: 'MyList',
    components:{
        Navbar
    },
    data () {
        return {
            wordInput: ''
        }
    },

    methods: {
        ...mapMutations(['saveWord']),
        ...mapActions(['getWord', 'getWordDB']),
        
        save(){
            this.saveWord(this.wordInput);
        }
    },

    computed: {
        ...mapState(['word', 'words', 'wordsArray']),
    },

    created() {
        this.getWordDB();
    }
}
</script>
<style scoped>
    .input-search{
        margin-top: 6px;
    }
    .background{
    background-image: linear-gradient(rgba(248,201,255,.5), rgba(252, 255, 41,.5)), url('../assets/yellownotes.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100vh;
    }
    table{
        background-color: #FEE5FA;
    }
</style>