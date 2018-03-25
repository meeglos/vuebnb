import "core-js/fn/object/assign";
import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';

let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

// Start: <image-carousel component> ##################################
Vue.component('image-carousel', {
	props: ['images'],
	template: `<div class="image-carousel">
			  <img v-bind:src="image"/>
			  <div class="controls">
			  	<carousel-control dir="left" @change-image="changeImage"></carousel-control>
			  	<carousel-control dir="right" @change-image="changeImage"></carousel-control>
			  </div>
            </div>`,
	data() {
		return {
			images: [
				'/images/1/Image_1.jpg',
				'/images/1/Image_2.jpg',
				'/images/1/Image_3.jpg',
				'/images/1/Image_4.jpg'
			],
			index: 2
		}
	},
	computed: {
		image() {
			return this.images[this.index];
		}
	},
	methods: {
		changeImage(val) {
			let newVal = this.index + parseInt(val);
			if (newVal < 0) {
				this.index = this.images.length - 1;
			} else if (newVal === this.images.length) {
				this.index = 0;
			} else {
				this.index = newVal;
			}
		}
	},	
	components: {
		'carousel-control': {
			template: `<i :class="classes" @click="clicked"></i>`,
			props: ['dir'],
			computed: {
				classes() {
					return 'carousel-control fa fa-2x fa-chevron-' + this.dir;
				}
			},
			methods: {
				clicked() {
					this.$emit('change-image', this.dir === 'left' ? -1 : 1);
				}
			}
		}
	}
});
// End: <image-carousel component> ####################################

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
	}
});

document.addEventListener('keyup', function (evt) {
	if (evt.keyCode === 27 && app.modalOpen) {
		app.modalOpen = false;
	}
});
