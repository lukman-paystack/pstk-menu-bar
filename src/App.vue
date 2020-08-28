<template>
  <v-app style="background-color:#fff;" color="primary">
    <v-main>
      <v-container style="padding:5px;">
          <v-text-field
            outlined
            clearable
            label="Search"
            class="text-h4"
            height="75px"
            autofocus
            v-model="search_string"
            color="primary"
            prepend-icon="mdi-magnify"
            @keydown="listenForKeyPress"
          >
            <template v-if="show_pref" v-slot:prepend-inner>
              <v-chip style class="ma-2 display-1" color="accent" text-color="white">{{ pref_text }}</v-chip>
            </template>
          </v-text-field>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},
  data() {
    return {
      show_pref: true,
      pref_text: "tr",
      search_string: null,
      prefixObj: [
        {
          shortcode: "str",
          base_url: "https://watchtower.paystack.co/#/transactions",
          key: "reference",
          type: "query",
        },
        {
          shortcode: "tr",
          base_url: "https://watchtower.paystack.co/#/transaction",
          key: "id",
          type: "path",
        },
        {
          shortcode: "me",
          base_url: "https://watchtower.paystack.co/#/integrations",
          key: "id",
          type: "path",
        },
        {
          shortcode: 'sc',
          base_url:'https://watchtower.paystack.co/#/transactions?query_type=is_customer',
          type:"query",
          key:'customer_email'
        }
      ],
      prefixes: ["tr", "str", "sc", "me", "mre", "st", "trr", "mrn", "trd"],
    };
  },
  watch: {
    search_string(newV, old) {
      let v = newV.trim();
      if (this.prefixes.indexOf(v) >= 0 && newV[newV.length - 1] == " ") {
        this.pref_text = newV.trim();
        this.search_string = "";
        this.showPref();
      }
    },
  },
  methods: {
    listenForKeyPress(event) {
      if (event.key == "Enter") {
        if (this.pref_text && this.search_string) {
          let command = {};
          this.prefixObj.forEach((pr) => {
            if (pr.shortcode == this.pref_text) {
              switch (pr.type) {
                case "path":
                  window
                    .require("electron")
                    .shell.openExternal(pr.base_url + "/" + this.search_string);
                  break;
                default:
                    window
                    .require("electron")
                    .shell.openExternal(pr.base_url + "?" + pr.key+'='+this.search_string);
              }
            }
          });
        }
      }else if(event.key == 'Backspace' && !this.search_string && this.pref_text){
        this.pref_text = ""
        this.hidePref()
      }
    },
    showPref(txt) {
      this.show_pref = true;
    },
    hidePref() {
      this.show_pref = false;
    },
  },
  mounted() {
    this.show_pref = false;
  },
};
</script>
