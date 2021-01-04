<template>
<div>
  <div class="container" id="background">
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-6 col-12 mt-5">
        <div class="d-block d-sm-none">
            <b-button variant="outline-dark" class="mr-4 mt-3">Login</b-button>
            <b-button class="mt-3 mr-4" variant="warning">Register</b-button>
        </div>
        <h1 id="title" variant="secondary"  class="display-1 font-weight-bold mt-5">Save <br> the <br> word</h1>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6 col-12 d-none d-sm-block">
        <div id="yellownote">
          <div class="d-flex justify-content-end">
            <b-button variant="outline-dark" class="mr-4 mt-3" data-toggle="modal" data-target="#loginModal">Login</b-button>
            <b-button class="mt-3 mr-4" variant="warning" data-toggle="modal" data-target="#registerModal">Register</b-button>
          </div>
          <div  class="container d-none d-sm-block">
            <p id="text">Here you can save those words you couldn’t keep in your brain, with a little help from us you can learn even more words!!<br> We can save the word together.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Login Modal -->
  <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">LOGIN</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          
            <div class="form-group">
              <!-- <label for="exampleDropdownFormEmail2">Email address</label> -->
              <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="Email Address">
            </div>
            <div class="form-group">
              <!-- <label for="exampleDropdownFormPassword2">Password</label> -->
              <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="dropdownCheck2">
              <label class="form-check-label" for="dropdownCheck2">
                Remember me
              </label>
            </div>
            <button type="submit" class="btn btn-primary">Sign in</button>
          
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
      </div>
    </div>
  </div>


  <!-- Register Modal -->
  <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">CREATE AN ACCOUNT</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          
            <div class="form-group">
              <!-- <label for="exampleDropdownFormEmail2">Email address</label> -->
              <input type="email" class="form-control" id="exampleDropdownFormEmail2" placeholder="Email Address">
            </div>
            <div class="form-group">
              <!-- <label for="exampleDropdownFormPassword2">Password</label> -->
              <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Password">
            </div>
            <div class="form-group">
              <!-- <label for="exampleDropdownFormPassword2">Repeat Password</label> -->
              <input type="password" class="form-control" id="exampleDropdownFormPassword2" placeholder="Repeat Password">
            </div>
            <button type="submit" class="btn btn-primary">Sign up</button>
          
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div> -->
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
  #background{
    background-image: url('../assets/yellownotes.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }
  #text{
    padding-left: 2em;
  }
  #google-button{
    background-color: white;
  }
}
  #yellownote{
  background-image: url('../assets/yellownotes.jpg');
  background-size: cover;
	background-repeat: no-repeat;
	background-position: 100% 50%;
  height: 100vh;
  margin-right: -7.4999em;
  } 

#google{
  width: 2.5em;
}
#google-button{
  width: 14em;
  margin-left: 6em;
}
</style>
