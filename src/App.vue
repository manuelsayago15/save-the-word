<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: "App",

  methods: {
    ...mapActions(['getWordDB'])
  },

  created () {
    this.getWordDB();
  }
};
</script>
