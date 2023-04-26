import { createApp } from "vue";
import i18n from '@/base/i18n';
import store from "@/base/store";
import "@/registerServiceWorker";
import App from "@/pc/App.vue";
import router from "@/pc/router";

import '@/base/styles/main.scss';

createApp(App)
.use(store)
.use(router)
.use(i18n)
.mount("#app");
