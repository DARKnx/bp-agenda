import { createApp } from 'vue';

import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import AppVue from './App.vue';
import router from './router';
import '/src/global.css';

createApp(AppVue)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .mount('#app');

