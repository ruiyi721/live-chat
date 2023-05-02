import { defineAsyncComponent, Plugin } from 'vue';
import HeaderComponent from './HeaderComponent.vue';

const components = {
    [HeaderComponent.name]: defineAsyncComponent(() => import('./HeaderComponent.vue')),
}; 

export default {
    install: (app) => {
        for (const name in components) {
            app.component(name, components[name]);
        }
    }
} as Plugin;