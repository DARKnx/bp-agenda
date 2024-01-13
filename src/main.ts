import { createApp } from 'vue';

import { toast, options  } from './plugins/toast';
import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import AppVue  from './App.vue';
import '/src/styles/global.css';
import router from './router';

createApp(AppVue)
    .use(pinia)
    .use(router)
    .use(vuetify)
    .use(toast, options)
    .mount('#app');

