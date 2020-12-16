<template>
<div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <Sidebar/>    
    <b-navbar-brand href="#" class="ml-2">Save the word</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="mr-5 h4">
          <template #button-content >
            <b-icon icon="person-fill" aria-hidden="true"></b-icon>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">My list</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
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

</style>
