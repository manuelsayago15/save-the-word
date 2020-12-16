<template>
<div>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-12 mt-5">
        <h1 id="title" variant="secondary"  class="display-1 font-weight-bold mt-5">Save <br> the <br> word</h1>
        <b-button id="google-button" variant="outline-dark">Sign in with <img id="google" src="../assets/google.jpg" alt="Google Logo"> </b-button>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-12">
        <div id="yellownote">
          <div class="d-flex justify-content-end">
            <b-button variant="outline-dark" class="mr-4 mt-3">Login</b-button>
            <b-button class="mt-3 mr-4" variant="warning">Register</b-button>
          </div>
          <div  class="container">
            <p id="text">Here you can save those words you couldn’t keep in your brain, with a little help from us you can learn even more words!! We can save the word together.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap');
#text{
  font-family: 'Indie Flower', cursive;
  font-weight: bold;
  font-size: 22px;
  padding-left: 6em;
  padding-right: 4em;
  margin-top: 8em;
}
#title{
  margin-left: 1em;
}
@media (max-width: 768px) { 
  #yellownote{
    margin-top: 2em;
    margin-right: 0em !important;
  }
  #text{
    padding-left: 2em;
  }
}
  #yellownote{
  background-image: url('../assets/yellownotes.jpg');
  background-size: cover;
	background-repeat: no-repeat;
	background-position: 100% 50%;
  height: 100vh;
  margin-right: -3.4999em;
  } 

#google{
  width: 2.5em;
}
#google-button{
  width: 14em;
  margin-left: 6em;
}
</style>
