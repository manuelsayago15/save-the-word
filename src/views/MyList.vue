<template>
    <div>
        <Navbar/>
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <h1>MY LIST</h1>
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
            <th scope="col">TRANSLATION</th>
            <th scope="col">AUDIO</th>
            <th scope="col">ACTIONS</th>
            </tr>
        </thead>
        <tbody v-for="(word, index) in words" :key="index">
            <tr>
            <th scope="row">{{word.wordData}}</th>
            <td>{{word.meaning}}</td>
            <td>{{word.example}}</td>
            <td>@mdo</td>
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
import Navbar from '@/components/Navbar';
import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: 'MyList',
    components: {
        Navbar
    },
    data () {
        return {
            wordInput: ''
        }
    },

    methods: {
        ...mapMutations(['saveWord']),
        ...mapActions(['getWord']),
        
        save(){
            this.saveWord(this.wordInput);
        }
    },

    computed: {
        ...mapState(['word', 'words']),
    },

    created() {
        
        }
}
</script>
<style scoped>
    .input-search{
        margin-top: 6px;
    }
</style>