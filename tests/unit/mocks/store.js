export default {
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
    },
    mutations:{
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
    actions:{
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
              commit('setUser', userDB);
              router.push('/levels');
              localStorage.setItem('user', JSON.stringify(userDB));
              //localStorage.setItem('test', JSON.stringify(state.user));
            } catch (error) {
              console.log(error);
            }
          },
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
              state.wordExist = true;
            } catch(error) {
              if(error){
                state.wordExist = false;    
              }
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
            JSON.stringify(dataDB)            
          } catch(error) {
            console.log(error);
          }

        } else {
          state.same = false;
          return
        }
      },
          async getWordDB ({commit, state}) {
            if(localStorage.getItem('user')){
              commit('setUser', JSON.parse(localStorage.getItem('user')));
            } else {
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
          },
          async deleteWordDB ( {commit, state}, id) {
            try{
              await fetch(`https://save-the-word-40090-default-rtdb.firebaseio.com/words/${state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
                method: 'DELETE'
              })
              commit('deleteWord', id);
            } catch (error) {
                console.log(error);
            }
          },

          logout( {commit, state} ){
            commit('setUser', null);
            console.log("user after null asigned: " + state.user);
            localStorage.removeItem('user')
          }
    }
}