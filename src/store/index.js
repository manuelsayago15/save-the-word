import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    words: [],
    word: '',
    testme: ''
  },
  mutations: {
    saveWord(state, newWord) {
      console.log(newWord);
      state.word = newWord;
      console.log(state.word);
    },
  },
  actions: {
      getWord: async function({state}, value) {
        console.log(state.word);
        console.log(value);
        if(value) {
          state.word = value;
          console.log(state.word);
        }
        const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + state.word);
        state.array = await data.json();
        console.log(state.words);
        let wordData = state.array[0].word;
        let meaning = state.array[0].meanings[0].definitions[0].definition;
        let example = state.array[0].meanings[0].definitions[0].example;
        let audio = state.array[0].phonetics[0].audio;
        console.log("Word: " + wordData);
        console.log("Meaning: " + meaning);
        console.log("Example: " + example);
        console.log("Audio: " + audio);
        state.words.push({
          meaning,
          example,
          wordData,
          audio
        });
        console.log(state.words);
      },
  },
  modules: {
  }
})
