import { createApp } from "vue";
import i18n from '@/base/i18n';
import "@/registerServiceWorker";
import App from "@/pc/App.vue";
import router from "@/pc/router";
import components from './components';

import '@/base/styles/main_pc.scss';

createApp(App)
.use(router)
.use(i18n)
.use(components)
.mount("#app");
