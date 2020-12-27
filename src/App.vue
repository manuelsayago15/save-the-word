<template>
  <div id="app">
    <transition name="vista">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>

export default {
  name: "App",
  methods: {
    
  },
};
</script>

<style>
.vista-enter-active {
  transition: all 0.3s ease;
}
.vista-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.vista-enter,
.vista-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>