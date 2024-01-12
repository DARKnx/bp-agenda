import { createApp } from 'vue'
import { App } from '/src/App'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '/src/global.css';



const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'dark',
      },
})

createApp(App).use(vuetify).mount('#app');

