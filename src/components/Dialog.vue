<template>
  <v-dialog
    v-model="popup">
    <v-card>
      <v-card-title>
        {{info.name}}
        <v-spacer />
        <v-icon
          aria-label="Close"
          @click="popup=false"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text>
        <v-checkbox
          v-model="status.availableProducts">
        </v-checkbox>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="popup = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { get } from '../helpers/api'
  export default {
    name: 'Dialog',

    data: () => ({
      popup: true,
      info: '',
      status: '',
      cities: []
    }),

    computed: {
    },

    watch: {
    },

    methods: {
      getInfo() {
        get(this, '', '', response=>{
          this.info = response.data;
          this.status = this.info.status;
          this.cities = this.info.cities;
          console.log(this.info);
        })
      },
    },

    created() {
      this.getInfo();
    },
  }
</script>
