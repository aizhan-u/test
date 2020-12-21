<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        {{name}}
      </div>

      <v-spacer/>

      <v-btn
        text
      >
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Dialog/>
    </v-main>
  </v-app>
</template>

<script>
import { get } from './helpers/api'
import Dialog from './components/Dialog';

export default {
  name: 'App',

  components: {
    Dialog,
  },

  data: () => ({
    name: ''
  }),

  methods: {
    getInfo() {
      get(this, '', '', response=>{
        this.name = response.data.name;
      })
    },
  },

  created() {
    this.getInfo();
  },
};
</script>
