import { createApp } from 'vue'
import App from './App.vue'
import router from './config/router'
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);
app.use(router)
//Configurar Token API Google MAPS

// main.ts
//Importación Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

app.mount('#app')
