<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <Sidebar/>    
    <b-navbar-brand class="ml-2"><router-link class="title" to="/levels">Save the word</router-link>
    </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="mr-5 h4">
          <template #button-content >
            <b-icon icon="person-fill" aria-hidden="true"></b-icon>
          </template>
          <b-dropdown-item><router-link to="/profile">Profile</router-link></b-dropdown-item>
          <b-dropdown-item><router-link to="/my-list">My list</router-link></b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

  </b-navbar>
</div>
</template>

<script>
import Sidebar from './Sidebar.vue'
export default {
  name: 'Navbar',
  components: {
    Sidebar
  }

}
</script>


<style scoped>
.title{
  color:black;
}

</style>
