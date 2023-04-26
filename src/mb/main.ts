import { createApp } from "vue";
import i18n from '@/base/i18n';
import store from "@/base/store";
import "@/registerServiceWorker";
import App from "@/mb/App.vue";
import router from "@/mb/router";

import '@/base/styles/main.scss';

createApp(App)
.use(store)
.use(router)
.use(i18n)
.mount("#app");
