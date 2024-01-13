import { aliases, mdi } from 'vuetify/iconsets/mdi';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';

import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.css';
import 'vuetify/styles';


const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
    theme: {
        defaultTheme: 'dark',
        themes:{
          light:{
            dark: false,
            colors:{
              primary: '#0E4981',
              secondary:'#1D90CF'
            }
          },
          dark:{
            dark: true,
            colors:{
              primary:'#0E4981',
              secondary:'#1D90CF'
            },
          }
        }
      },
      icons: {
    defaultSet: 'mdi',
        aliases,
        sets: {
          mdi,
        },
    },
})

export default vuetify