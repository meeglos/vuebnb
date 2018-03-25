import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

import ImageCarousel from '../components/ImageCarousel.vue';

var app = new Vue({
	el: '#app',
	data: Object.assign(model, {
		headerImageStyle: {
			'background-image': `url(${model.images[0]})`
		},
		contracted: true,
		modalOpen: false
	}),
	methods: {
		escapeKeyListener(evt) {
			if (evt.keyCode === 27 && this.modalOpen) {
				this.modalOpen = false;
			}
		}
	},
	components: {
		ImageCarousel
	}
});

document.addEventListener('keyup', function (evt) {
	if (evt.keyCode === 27 && app.modalOpen) {
		app.modalOpen = false;
	}
});
