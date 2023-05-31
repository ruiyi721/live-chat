import { createApp } from "vue";
import i18n from '@/base/i18n';
import "@/registerServiceWorker";
import App from "@/mb/App.vue";
import router from "@/mb/router";
import components from './components';
// plugins
import VueFinalModal from 'vue-final-modal';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import vue3GoogleLogin from 'vue3-google-login';

import 'element-plus/dist/index.css'
import '@/base/styles/main_mb.scss';

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App)
.use(i18n)
.use(router)
.use(components)
.use(VueFinalModal())
.use(pinia)
.use(vue3GoogleLogin, {
  clientId: '463578192557-mlhme4em9hndolues8re3eta9s016noc.apps.googleusercontent.com'
})
.mount("#app");
