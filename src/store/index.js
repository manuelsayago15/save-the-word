import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import router from '../router/index.js';
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
    wordsDB: [],
    count: 0,
    same: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    //Buscador
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
      //API consume dictionary
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

      async consumeDB({state}) {
        try {
          const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}.json?auth=${state.user.idToken}`);
          const data = await response.json();
          console.log(data);
          let Array = []
          for (let key in data) {
            if(data[key].wordData === state.words.wordData) {
              console.log("ES IGUAL");
              state.same = true;
              console.log(state.same);
            } else {
              Array.push(data[key]);
              console.log("PUSH DE PALABRA DESDE DB " + JSON.stringify(state.wordsDB));
              console.log("data[key]: " + JSON.stringify(data[key]));
            }
          }
          state.wordsDB = Array;
          console.log("PALABRAS DESDE DB: " + JSON.stringify(state.wordsDB));
          // if(state.wordsDB.length > 0){
          //   for (var i = 0; i < state.wordsDB.length; i++) {
          //     console.log("wordData from wordsDB: " + JSON.stringify(state.wordsDB[i].wordData));
          //   }
          // }
         
          console.log("PALABRA RECIEN AGREGADA: EN DB" + state.words.wordData);
          
          const found = state.wordsDB.find(element => element == 44);

          console.log(found);
          
          console.log("Data from wordsDB: " + JSON.stringify(state.wordsDB));
          console.log("wordsDB length: " + state.wordsDB.length);
        } catch (error) {
          console.log(error);
        }
      },
       //Save word in DataBase
      async setWordDB ({state, dispatch}) {
        //console.log("words.id: " + state.words.id);
        dispatch('consumeDB', state.words.wordData);
        setTimeout( () => dispatch('setWordValidation'), 2000);
        console.log(state.wordsDB.length);
        

      },

      async setWordValidation({state}) {
        if(state.same == false){
          try {
            const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}/${state.words.id}.json?auth=${state.user.idToken}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(state.words)
            })
  
            const dataDB = await response.json();
            console.log("Response setWordDB: " + JSON.stringify(dataDB));
            //console.log(dataDB.name);
            //console.log(JSON.stringify(state.words));
            JSON.stringify(dataDB)
           // console.log("test: " + state.words);
            
          } catch(error) {
            console.log(error);
          }

        } else {
          state.same = false;
          return
        }
      },

      //Get words from Database
      async getWordDB ({commit, state}) {
        if(localStorage.getItem('user')){
          console.log(state.user);
          commit('setUser', JSON.parse(localStorage.getItem('user')));
        } else {
          console.log(state.user);
          return commit('setUser', null);
        }
        const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}.json?auth=${state.user.idToken}`);
        const data = await response.json();
        console.log("Data from Database" + data);
         let Array = []
          for (let key in data) {
            console.log("DATA: " + JSON.stringify(data));
            console.log(data[key].wordData);
            Array.push(data[key]);
          }
          state.wordsArray = Array
          //console.log("ARRAY: " + JSON.stringify(state.wordsArray));
      },

      //Delete word from Database
      async deleteWordDB ( {commit, state}, id) {
        //console.log(id);
        try{
          await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
            method: 'DELETE'
          })
          //console.log("ID: " + id);
          commit('deleteWord', id);
        } catch (error) {
            console.log(error);
        }
      },

      //User register method
      async userRegister( {commit}, user) {
        console.log("user register: " + JSON.stringify(user));
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4henVOu1LcVxyj7hzlG0N7gfGQFi3f50', {
            method: 'POST',
            body: JSON.stringify({
              displayName: user.displayName,
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
          localStorage.setItem('user', JSON.stringify(userDB));
        } catch (error) {
          console.log(error);
        }
      },

      //User login method
      async userLogin ( {commit}, user) {
        console.log("user login: " + JSON.stringify(user));
        try {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4henVOu1LcVxyj7hzlG0N7gfGQFi3f50', {
            method: 'POST',
            body: JSON.stringify({
              displayName: user.displayName,
              email: user.email,
              password: user.password,
              returnSecureToken: true
            })
          })
          const userDB = await response.json();
          console.log("user DB: " + JSON.stringify(userDB))

          if (userDB.error) {
            console.log(userDB.error);
            return
          }
          commit('setUser', userDB);
          router.push('/levels');
          localStorage.setItem('user', JSON.stringify(userDB));
          //localStorage.setItem('test', JSON.stringify(state.user));
        } catch (error) {
          console.log(error);
        }
      },

      async update ( {commit}, user) {
        console.log(user);
        try {
          const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA4henVOu1LcVxyj7hzlG0N7gfGQFi3f50`, {
            method: 'POST',
            body: JSON.stringify({
              displayName: user.displayName
            })
          })
          const userDB = await response.json();
          console.log("updated profile" + JSON.stringify(userDB));
          if (userDB.error) {
            console.log(userDB.error);
            return
          }
          commit('setUser', userDB);
          router.push('/levels');
          localStorage.setItem('user', JSON.stringify(userDB));
        } catch (error) {
          console.log(error);
        }
      },
      
      //Logout method
      logout( {commit, state} ){
        console.log(state.user);
        commit('setUser', null);
        console.log("user after null asigned: " + state.user);
        router.push('/');
        localStorage.removeItem('user')
      }
  },

  getters: {
    loggedUser(state) {
      return !!state.user;
    }
  },
  modules: {
  }
})
