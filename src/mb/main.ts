import { createApp } from "vue";
import i18n from '@/base/i18n';
import store from "@/base/store";
import "@/registerServiceWorker";
import App from "@/mb/App.vue";
import router from "@/mb/router";
import components from './components';
// plugins
import VueFinalModal from 'vue-final-modal';

import 'element-plus/dist/index.css'
import '@/base/styles/main_mb.scss';

createApp(App)
.use(i18n)
.use(store)
.use(router)
.use(components)
.use(VueFinalModal())
.mount("#app");
