import { defineAsyncComponent, Plugin } from 'vue';
import Modal from './Modal.vue';
import HeaderComponent from './HeaderComponent.vue';

const components = {
	[Modal.name]: Modal,
	[HeaderComponent.name]: defineAsyncComponent(() => import('./HeaderComponent.vue')),
};

export default {
	install: (app) => {
		for (const name in components) {
			app.component(name, components[name]);
		}
	}
} as Plugin;