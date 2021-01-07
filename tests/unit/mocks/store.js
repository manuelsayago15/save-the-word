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
        deleteWord(state, id) {
          state.wordsArray = state.wordsArray.filter(item => item.id !== id);
        },
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