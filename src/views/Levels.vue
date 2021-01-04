<template>
  <div class="background">
    <Navbar/>
    <div class="container ">
      <h1 class="display-4 text-center py-5 margin">If there is a word you don’t understand, you can doubleclick on it and add it to your list!</h1>

      <div class="accordion button" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
                <b-button block v-b-toggle.accordion-1 variant="outline-dark">Level 1 
                    <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
                </b-button>                  
            </b-card-header>

            <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
                <b-card-body class="p-0">
                    <b-button block variant="light"><router-link to= "/levels/1/1">The Tortoise and the Hare</router-link></b-button>
                </b-card-body>
                    <hr>
                <b-card-body class="p-0">
                    <b-button block variant="light"><router-link to= "/levels/1/2">The Boy Who Cried Wolf</router-link></b-button>
                </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-button block v-b-toggle.accordion-2 variant="outline-dark">Level 2
                      <b-icon icon="caret-down-fill" aria-hidden="true"></b-icon>
                  </b-button>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion2" role="tabpanel">
                  <b-card-body class="p-0">
                      <b-button block variant="light"><router-link to= "/levels/2/1">Foolish Imitation</router-link></b-button>
                  </b-card-body>
                      <hr>
                  <b-card-body class="p-0">
                      <b-button block variant="light"><router-link to= "/levels/2/2">Bad Temper</router-link></b-button>
                  </b-card-body>
              </b-collapse>
          </b-card>
      </div>      
    </div>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Levels',
  components:{
    Navbar
  },

  data() {
    return {

    }
  },
  
}
</script>

<style scoped>
.accordion > .card > .card-header{
    padding: 0 !important;
}
.background{
  background-image: linear-gradient(rgba(248,201,255,.5), rgba(252, 255, 41,.5)), url('../assets/yellownotes.jpg');
  background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
  height: 100vh;
}
.margin{
  margin-left: 2em;
}
.button{
  margin-left: 6em;
}
a{
    color: black;
}
  
</style>
