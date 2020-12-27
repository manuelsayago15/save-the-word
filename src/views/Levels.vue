<template>
  <div class="background">
    <Navbar/>
    <div class="container">

    <h1>This is an about page</h1>
    </div>

  </div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
  name: 'Home',
  components:{
    Navbar
  }
}
</script>

<style scoped>
.background{
  background-image: linear-gradient(rgba(248,201,255,.5), rgba(252, 255, 41,.5)), url('../assets/yellownotes.jpg');
  background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
  height: 100vh;
}
  
</style>
