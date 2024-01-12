import { createApp } from 'vue';

import vuetify from './plugins/vuetify';
import pinia from './plugins/pinia';
import { App } from '/src/App';
import '/src/global.css';

createApp(App)
    .use(pinia)
    .use(vuetify)
    .mount('#app');

