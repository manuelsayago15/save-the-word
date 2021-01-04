<template>
    <div>
    <a v-b-toggle.sidebar-backdrop>
        <b-icon class="ml-3 mt-2 h4 d-flex justify-content-center pointer" icon="list" aria-hidden="true"></b-icon>
    </a>
    <b-sidebar id="sidebar-backdrop" title="Stories" :backdrop-variant="variant" bg-variant="warning" backdrop shadow>
      <div class="px-3 py-2">
            <div class="accordion" role="tablist">
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
    </b-sidebar>
  </div>
</template>

<script>
export default {
name:'Sidebar',
    data() {
      return {
        variant: 'dark',
      }
    }
}
</script>

<style scoped>
.b-sidebar > .bg-light > div > .b-sidebar-body    {
    background-color: red !important;
}
.accordion > .card > .card-header{
    padding: 0 !important;
}
a{
    color: black;
}
hr{
    margin: 0;
}
.pointer{
    cursor: pointer;
}

</style>