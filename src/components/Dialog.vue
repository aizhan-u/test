<template>
  <v-dialog
    v-model="popup">
    <v-card>
      <v-card-title class="headline font-weight-light">
        Наименование товара
        <v-spacer />
        <v-icon
          aria-label="Close"
          @click="popup=false"
        >
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card-text>
        <v-alert
          color="red"
          type="warning"
          :value="alert"
        >
          Вы не выбрали {{selectedCity === '' ? "город" : "способ доставки" }}
        </v-alert>
        <v-row>
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-card
              elevate="2"
              width="100%"
            >
              <v-card-title>
                Данные о продукте
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-for="item in items"
                  :key="item"
                  :label="item.label"
                  :value="item.text"
                  readonly
                />
              </v-card-text>
            </v-card>
          </v-col>
          
          <v-col
            class="d-flex"
            cols="12"
            sm="6"
          >
            <v-card
              elevate="2"
              width="100%"
            >
              <v-card-title>
                Наличие и доставка
              </v-card-title>
              <v-card-text>
                <v-checkbox
                  v-model="status.totalProducts"
                  :label="sale"
                  readonly
                />
                <v-checkbox
                  v-model="status.availableProducts"
                  :label="avail"
                  readonly
                />
                <v-text-field
                  label="Информация актуальна на"
                  :value="status.lastCheckDate.substring(0,10)"
                  hint="Просим связаться с поставщиком для уточнения деталей"
                  persistent-hint
                  readonly
                />
                <v-autocomplete
                  v-model="selectedCity"
                  :items="cities"
                  label="Выберите город"
                  clearable
                />
                <v-select
                  v-model="selectedMethod"
                  :items="rcvMethod"
                  label="Способ доставки"
                  :disabled="selectedCity === ''"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider/>

      <v-card-actions>
        <v-spacer/>
        <v-btn
          @click="popup = false"
        >
          Отменить
        </v-btn>
        <v-btn
          @click="saveData()"
          class="primary"
        >
          Сохранить
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
      cities: [],
      selectedCity: '',
      selectedMethod: '',
      alert: false,
      sale: '',
      avail: '',
      items: [
        {
          label: "SKU",
          text: "APPL",
        },
        {
          label: "Цена, ₽",
          text: 64990
        },
        {
          label: "Производитель",
          text: "Apple"
        },
        {
          label: "Наименование",
          text: "Apple Iphone 11 128GB Black"
        },
        {
          label: "Ссылка"
        }
      ],
      rcvMethod: [
        "KAZPOST", "Курьер", "Самовывоз", "Почтамат"
      ]
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
          this.sale = "В продаже " + this.status.totalProducts + " ед.";
          this.avail = "В наличии " + this.status.availableProducts + " ед.";
        })
      },
      saveData() {
        if(this.selectedCity == '' || this.selectedMethod == '') {
          this.alert = true;
        } else {
          this.alert = false;
          this.popup = false;
        }
      }
    },

    created() {
      this.getInfo();
    },
  }
</script>
