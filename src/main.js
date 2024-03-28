import { createApp } from 'vue'
import App from './App.vue';
import router from "@/components/router/router";
import bcrypt from 'bcryptjs'

import "bootstrap/dist/css/bootstrap.min.css"
import bootstrap from 'bootstrap/dist/js/bootstrap'

const app = createApp(App);

app
    .use(router)
    .use(bootstrap)
    .mount('#app');