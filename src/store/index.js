import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import router from '../router';
const shortid = require('shortid');

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    words: '',
    word: '',
    wordsArray: [],
    wordExist: '',
    user: null,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    saveWord(state, newWord) {
      console.log(newWord);
      state.word = newWord;
      console.log(state.word);
    },

    deleteWord(state, id) {
      state.wordsArray = state.wordsArray.filter(item => item.id !== id);
    },

    setValueWordExist (state, newValue) {
      state.wordExist = newValue;
      console.log(state.wordExist);
    }
  },
  actions: {
      getWord: async function({state, dispatch}, value) {
        try{
          if(value) {
            state.word = value;
          }
          const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + state.word);
          state.array = await data.json();
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
      },

      async setWordDB ({state}) {
        console.log("words.id: " + state.words.id);
        try {
          const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.words.id}.json`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.words)
          })

          const dataDB = await response.json();
          console.log(dataDB);
          console.log(dataDB.name);
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
         // console.log("Data from Database" + data);
          for (let key in data) {
            //console.log("DATA: " + JSON.stringify(data));
            state.wordsArray.push(data[key]);
          }
          console.log("ARRAY: " + JSON.stringify(state.wordsArray));
      },

      async deleteWordDB ( {commit}, id) {
        console.log(id);
        try{
          await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${id}.json`, {
            method: 'DELETE'
          })
          console.log("ID: " + id);
          commit('deleteWord', id);
        } catch (error) {
            console.log(error);
        }
      },

      async userRegister( {commit}, user) {
        console.log(user);
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4henVOu1LcVxyj7hzlG0N7gfGQFi3f50', {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true
            })
          })
          const userDB = await response.json();
          console.log(userDB);
          if (userDB.error) {
            console.log(userDB.error);
            return
          }
          commit('setUser', userDB);
        } catch (error) {
          console.log(error);
        }
      },

      async userLogin ( {commit}, user) {
        console.log(user);
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4henVOu1LcVxyj7hzlG0N7gfGQFi3f50', {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              password: user.password,
              returnSecureToken: true
            })
          })
          const userDB = await response.json();
          console.log(userDB);
          if (userDB.error) {
            console.log(userDB.error);
            return
          }
          commit('setUser', userDB);
          router.push('levels');
        } catch (error) {
          console.log(error);
        }
      }
  },
  modules: {
  }
})
