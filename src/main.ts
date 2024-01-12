import { createApp } from 'vue'
import { App } from '/src/App'
import vuetify from './plugins/vuetify';


import '/src/global.css';





createApp(App)
    .use(vuetify)
    .mount('#app');

