import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
const shortid = require('shortid');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    words: '',
    word: '',
    wordsArray: [],
    wordExist: '',
    idArray: []
  },
  mutations: {
    saveWord(state, newWord) {
      console.log(newWord);
      state.word = newWord;
      console.log(state.word);
    },

    setValueWordExist (state, newValue) {
      state.wordExist = newValue;
      console.log(state.wor);
    }
  },
  actions: {
      getWord: async function({state, dispatch}, value) {
        try{
          // console.log(state.word);
          // console.log(value);
          if(value) {
            state.word = value;
            // console.log(state.word);
          }
          const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + state.word);
          state.array = await data.json();
          // console.log(state.words);
          let wordData = state.array[0].word;
          let meaning = state.array[0].meanings[0].definitions[0].definition;
          let example = state.array[0].meanings[0].definitions[0].example;
          let audio = state.array[0].phonetics[0].audio;
          console.log("Word: " + wordData);
          console.log("Meaning: " + meaning);
          console.log("Example: " + example);
          console.log("Audio: " + audio);
          let id = shortid.generate();
          console.log("ID: " + id);
          state.words = {
            id,
            meaning,
            example,
            wordData,
            audio
          }
          dispatch('setWordDB', state.words);
        } catch(error) {
          state.wordExist = false;
          Swal.fire({
            icon: 'error',
            title: 'No Definitions Found',
            text: 'Something went wrong, try again!',
          })
        }
        // console.log(state.words);
      },

      async setWordDB ({state}) {
        try {
          const response = await fetch('https://save-the-word-40090-default-rtdb.firebaseio.com/words.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.words)
          })

          const dataDB = await response.json();
          console.log(dataDB);
          console.log(dataDB.name);
          state.idArray.push(dataDB);
          console.log(JSON.stringify(state.words));
          JSON.stringify(dataDB)
          console.log("test: " + state.words);
          
        } catch(error) {
          console.log(error);
        }
      },

      async getWordDB ({state}) {
       
          const response = await fetch('https://save-the-word-40090-default-rtdb.firebaseio.com/words.json');
          const data = await response.json();
          console.log("Data from Database" + data);
          for (let key in data) {
            console.log("DATA: " + JSON.stringify(data));
            state.wordsArray.push(data[key]);
          }
          console.log("ARRAY: " + JSON.stringify(state.wordsArray));
      },

      async deleteWordDB ({state}) {
        
      }
  },
  modules: {
  }
})
