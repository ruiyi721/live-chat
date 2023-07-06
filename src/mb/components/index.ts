import { defineAsyncComponent, Plugin } from 'vue';
import {
	ElInput
} from 'element-plus';
import { Carousel as VueCarousel, Slide, Navigation } from 'vue3-carousel';
import Modal from './Modal.vue';
import HeaderComponent from './HeaderComponent.vue';

const components = {
	[ElInput.name]: ElInput,
	[Modal.name]: Modal,
	VueCarousel,
  Slide,
  Navigation,
	[HeaderComponent.name]: defineAsyncComponent(() => import('./HeaderComponent.vue')),
};

export default {
	install: (app) => {
		for (const name in components) {
			app.component(name, components[name]);
		}
	}
} as Plugin;