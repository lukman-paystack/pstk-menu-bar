import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    themes: {
      light: {
        primary: '#011B33',
        secondary: '#DCF6FF',
        accent: '#FFAA22',
        error: '#b71c1c',
      },
    },
  }
});
