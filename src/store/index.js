import Vue from 'vue';
import Vuex from 'vuex';
import Swal from 'sweetalert2';
import {Notification} from 'element-ui';
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
    same: false,
    nameDB: '',
    showLevels: 0,
    levels: '',
    nivel: '',
    showTale: false,
    showTale2: false,
    showTale3: false,
    error: {tipo: null, mensaje: ''}
  },
  mutations: {
    setTale(state, newValue) {
      state.showTale = newValue;
      console.log(state.showTale);
    },
    setTale2(state, newValue) {
      state.showTale2 = newValue;
      console.log(state.showTale2);
    },
    setTale3(state, newValue) {
      state.showTale3 = newValue;
      console.log(state.showTale3);
    },
    setError(state, payload) {
      console.log(payload)
      console.log(state.error)

      // REINICIAR
      if (payload === null) {
        return state.error = {tipo: null, mensaje: ''}
      }
      // LOGIN
      if (payload === "EMAIL_NOT_FOUND") {
        Notification({
          title: 'Error',
          message: 'Email not found',
          type: 'error'
        }); 
        return state.error = {
          tipo: 'email',
          mensaje: 'Email no registrado'
        }
      }
      // LOGIN
      if (payload === "INVALID_PASSWORD") {
        Notification({
          title: 'Error',
          message: 'Invalid password',
          type: 'error'
        }); 
        return state.error = {
          tipo: 'password',
          mensaje: 'Contraseña no válida'
        }
      }
      // LOGIN
      if (payload === "EMAIL_EXISTS") {
        Notification({
          title: 'Error',
          message: 'Email exists',
          type: 'error'
        }); 
        return state.error = {
          tipo: 'email',
          mensaje: 'Email ya registrado'
        }
      }
      // REGISTRO
      if (payload === "INVALID_EMAIL") {
        Notification({
          title: 'Error',
          message: 'Invalid email',
          type: 'error'
        }); 
        return state.error = {
          tipo: 'email',
          mensaje: 'Formato email no válido'
        }
      }
      if (payload === "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.") {
        Notification({
          title: 'Error',
          message: 'Oopss... too many attempts, try later',
          type: 'error'
        }); 
      }
    },
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
    },
    setName(state, newName) {
      state.nameDB = newName;
      console.log(state.nameDB);
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
          let id = shortid.generate();
          state.words = {
            id,
            meaning,
            example,
            wordData,
            audio
          }
          dispatch('setWordDB', state.words);
          state.wordExist = true
          //setTimeout( () => state.wordExist = true, 1500);
        } catch(error) {
          if(error){
            state.wordExist = false;
          }
            Swal.fire({
              icon: 'error',
              title: 'No Definitions Found',
              text: 'Something went wrong, try again!',
            })
        }
      },

      //Check if a word exists
      async consumeDB({state}) {
        try {
          const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}.json?auth=${state.user.idToken}`);
          const data = await response.json();
          //console.log(data);
          let Array = []
          for (let key in data) {
            if(data[key].wordData === state.words.wordData) {
              state.same = true;

              Notification({
                title: 'Warning',
                message: 'You already saved this word',
                type: 'warning'
              }); 

            } else {
              Array.push(data[key]);
            }
          }
          state.wordsDB = Array;
        } catch (error) {
          console.log(error);
        }
      },
       //Save word in DataBase
      async setWordDB ({state, dispatch}) {
        //console.log("words.id: " + state.words.id);
        dispatch('consumeDB', state.words.wordData);
        setTimeout( () => dispatch('setWordValidation'), 1000);
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
          //console.log(state.user);
          commit('setUser', JSON.parse(localStorage.getItem('user')));
        } else {
          //console.log(state.user);
          return commit('setUser', null);
        }
        const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}.json?auth=${state.user.idToken}`);
        const data = await response.json();
         let Array = []
          for (let key in data) {
            Array.push(data[key]);
          }
          state.wordsArray = Array
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
        //console.log("user register: " + JSON.stringify(user));
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
          if(!userDB.error){
            Swal.fire({
              icon: 'success',
              title: 'Your account has been successfully created, now login!',
            })
          }

          //console.log(userDB);
          if (userDB.error) {
            console.log(userDB.error)
            return commit('setError', userDB.error.message)
          }
          commit('setUser', userDB);
          commit('setError', null);
          localStorage.setItem('user', JSON.stringify(userDB));
        } catch (error) {
          console.log(error);
        }
      },

      //User login method
      async userLogin ( {commit, state, dispatch}, user) {
        //console.log("user login: " + JSON.stringify(user));
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
          state.nameDB = userDB.displayName;
          localStorage.setItem('name', state.nameDB);
          if (userDB.error) {
            console.log(userDB.error)
            return commit('setError', userDB.error.message)
          }
          
          commit('setUser', userDB);
          commit('setError', null);
          router.push('/levels');
          localStorage.setItem('user', JSON.stringify(userDB));
          dispatch('getLevels');
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

      updateUser({commit}, user){
        JSON.stringify({
          displayName: user.displayName,
        })
        commit('setUser');
      },
      
      //Logout method
      logout( {commit, state} ){
        //console.log(state.user);
        let timerInterval
        Swal.fire({
          title: 'Bye!',
          timer: 500,
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
        commit('setUser', null);
        router.push('/');
        // setTimeout(()=>{
        //   router.push('/');
        // },200);
        localStorage.removeItem('user')
      },

      async setLevel({state}, {level, tale}) {
        if(level == 1 && tale == 1) {
          // console.log("level 1: " + level);
          // console.log("tale 1: " + tale);
          state.nivel = "one";
          state.levels = {
            firstTale: {
              tale
            }
          }
        }

        if(level == 1 && tale == 2) {
          // console.log("level 1: " + level);
          // console.log("tale 2: " + tale);
          state.nivel = "one";
          state.levels = {
            secondTale: {
              tale
            }
          }
        }

        if(level == 2 && tale == 1) {
          // console.log("level 2: " + level);
          // console.log("tale 1: " + tale);
          state.nivel = "two";
          state.levels = {
            firstTale: {
              tale
            }
          }
        }
        
        if(level == 2 && tale == 2) {
          // console.log("level 2: " + level);
          // console.log("tale 2: " + tale);
          state.nivel = "two";
          state.levels = {
            secondTale: {
              tale
            }
          }
        }
        
        try {
          const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/levels/${state.user.localId}/levels/${state.nivel}/tales.json?auth=${state.user.idToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(state.levels)
          })

          const dataDB = await response.json();
          // JSON.stringify(dataDB)
          
        } catch(error) {
          console.log(error);
        }
    },
    
    async getLevels({state}) {
      try {
        const response = await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/levels/${state.user.localId}.json?auth=${state.user.idToken}`);
        const data = await response.json();
        //console.log("Data from getLevels" + JSON.stringify(data));
        let Array = []
        for (let key in data) {
          Array.push(data[key].one);
          Array.push(data[key].two);
        }
        if(Array[Array.length - 2]){
          state.showTale = true;
        }
        if(Array[Array.length - 1]){
          state.showTale2 = true;
          state.showTale3 = true;
        }
      } catch (error) {
        console.log(error);
      }
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
