<template>
  <div id="app">
      <!-- <Navbar/>
    <transition name="fade"> -->
      <router-view :keys="$route.fullPath"></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
// import Navbar from './components/Navbar.vue'

export default {
  name: "App",
  // components:{
  //   Navbar
  // }
};
</script>

<style>

/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
} */


</style>