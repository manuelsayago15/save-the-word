<template>
    <div class="background">
        <Navbar/>
         <div class="container">
            <div class="row my-4">
                <div class="col-lg-8">
                    <h1 id="title" class="display-3 font-weight-bold text-center">MY LIST</h1>
                </div>
                <!-- <div class="col-lg-4 input-search">
                    <input type="text" v-model="wordInput" ref="search" placeholder="Search a word" 
                        @keyup="findWord">
                </div> -->
                
            </div>
        </div> 

        <div class="container">
            <input type="text" placeholder="Search a word" class="form-control my-2" v-model="filters.name.value"/>
            
            <v-table
                class="table"
                :data="wordsArray"
                :filters="filters"
                :currentPage.sync="currentPage"
                :pageSize="20"
                @totalPagesChanged="totalPages = $event"
            >
                <thead slot="head">
                    <th scope="col">WORD</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">EXAMPLE</th>
                    <th scope="col">AUDIO</th>
                    <th scope="col">ACTIONS</th>
                </thead>
                <tbody slot="body" slot-scope="{displayData}">
                    <tr v-for="(row, index) in displayData" :key="index">
                        <td>{{row.wordData}}</td>
                        <td>{{row.meaning}}</td>
                        <td>{{row.example}}</td>
                        <td>
                            <audio :src="row.audio" ref="audio" class="audio"></audio>
                            <b-button @click="playAudio(index)"><b-icon icon="play-circle-fill" aria-hidden="true"></b-icon> </b-button> 
                        </td>
                        <td><b-button @click="deleteWords(row.id)"><b-icon icon="trash" aria-hidden="true" ></b-icon></b-button></td>
                    </tr>
                </tbody>
            </v-table>

            <smart-pagination
                :currentPage.sync="currentPage"
                :totalPages="totalPages"
            />
        </div>


        <!-- <table class="table container">
            <thead>
                <tr>
                <th scope="col">WORD</th>
                <th scope="col">DESCRIPTION</th>
                <th scope="col">EXAMPLE</th>
                <th scope="col">AUDIO</th>
                <th scope="col">ACTIONS</th>
                </tr>
            </thead>
            <tbody v-for="(word, index) in wordsArray" :key="index">
                <tr>
                <th scope="row">{{word.wordData}}</th>
                <td>{{word.meaning}}</td>
                <td>{{word.example}}</td>
                <td>
                    <audio :src="word.audio" ref="audio" class="audio"></audio>
                    {{index}}
                    <b-button @click="playAudio(index)"><b-icon icon="play-circle-fill" aria-hidden="true"></b-icon> </b-button> 
                </td>
                <td><b-button id="delete" @click="deleteWords(word.id)"><b-icon icon="trash" aria-hidden="true" ></b-icon></b-button></td>

                </tr>
            </tbody>
        </table> -->
    </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
import { mapState, mapActions, mapMutations } from "vuex";
import Swal from 'sweetalert2';
export default {
    name: 'MyList',
    components:{
        Navbar
    },
    data () {
        return {
            wordInput: '',
            filters: {
                name: { value: '', keys: ['wordData'] }
            },
            currentPage: 1,
            totalPages: 0
        }
    },
    methods: {
        ...mapMutations(['saveWord', 'delete']),
        ...mapActions(['getWord', 'getWordDB', 'deleteWordDB']),
        
        save(){
            this.saveWord(this.wordInput);
        },

        findWord() {
            
        },

        deleteWords(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteWordDB(id);
                    Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                }
            })
        },

        playAudio(index){
            console.log(index);
            document.getElementsByClassName('audio')[index].play();
        }
    },

    computed: {
        ...mapState(['word', 'words', 'wordsArray']),

    },
    created() {
        this.getWordDB();
    },
    beforeCreate() {
        
        let timerInterval
        Swal.fire({
        title: 'Loading...',
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
                const b = content.querySelector('b')
                if (b) {
                b.textContent = Swal.getTimerLeft()
                }
            }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })
    },

}
</script>
<style scoped>
    #title{
        margin-left: 5em;
    }
    .input-search{
        margin-top: 6px;
    }
    .background{
    background-image: linear-gradient(rgba(248,201,255,.5), rgba(252, 255, 41,.5)), url('../assets/yellownotes.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    }
    table{
        background-color: #FEE5FA;
    }
</style>