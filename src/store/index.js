import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: [],
    words: [],
    word: '',
  },
  mutations: {
    saveWord(state, newWord) {
      state.word = newWord;
      console.log(state.word);
    }
  },
  actions: {
      getWord: async function({state}) {
        console.log(state.word);
        const data = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + state.word);
        state.array = await data.json();
        console.log(state.words);
        let wordData = state.array[0].word;
        let meaning = state.array[0].meanings[0].definitions[0].definition;
        let example = state.array[0].meanings[0].definitions[0].example;
        console.log(meaning);
        console.log(example);
        console.log(wordData);
        state.words.push({
          meaning,
          example,
          wordData
        });
        console.log(state.words);
      },
  },
  modules: {
  }
})
