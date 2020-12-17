<template>
  <div>
    <transition name="vista">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>

<style>
  .vista-enter-active {
      transition: all .3s ease;
  }
  .vista-leave-active{
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .vista-enter, .vista-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
</style>
