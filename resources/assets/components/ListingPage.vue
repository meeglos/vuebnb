<template>
  <div>
    <header-image 
      v-if="listing.images[0]" 
      :image-url="listing.images[0]" 
      @header-clicked="openModal" 
      :id="listing.id"
    ></header-image>
    <div class="listing-container">
      <div class="heading">
        <h1>{{ listing.title }}</h1>
        <p>{{ listing.address }}</p>
      </div>
      <hr>
      <div class="about">
        <h3>About this listing</h3>
        <expandable-text>{{ listing.about }}</expandable-text>
      </div>
      <div class="lists">
        <feature-list title="Amenities" :items="listing.amenities">
          <template slot-scope="amenity">
            <i class="fa fa-lg" :class="amenity.title.icon"></i>
            <span v-bind:class="{'amenity-not-available' : amenity.value}">{{ amenity.title.title }}</span>
          </template>
        </feature-list>
        <feature-list title="Prices" :items="listing.prices">
          <template slot-scope="price">
            {{ price.title }}: <strong>{{ price.value }}</strong>
          </template>
        </feature-list>
      </div>
    </div>
    <modal-window ref="imagemodal">
      <image-carousel :images="listing.images"></image-carousel>
    </modal-window>
  </div>
</template>
<script>
  import { populateAmenitiesAndPrices } from '../js/helpers';

  let serverData = JSON.parse(window.vuebnb_server_data);
  let model = populateAmenitiesAndPrices(serverData.listing);

  import ImageCarousel from './ImageCarousel.vue';
  import ModalWindow from './ModalWindow.vue';
  import FeatureList from './FeatureList.vue';
  import HeaderImage from './HeaderImage.vue';
  import ExpandableText from './ExpandableText.vue';

  export default {
    components: {
      ImageCarousel,
      ModalWindow,
      FeatureList,
      HeaderImage,
      ExpandableText
    },
    methods: {
      assignData({ listing }) {
        Object.assign(this.$data, populateAmenitiesAndPrices(listing));
      },
      openModal() {
        this.$refs.imagemodal.modalOpen = true;
      }
    },
    computed: {
      listing() {
        return populateAmenitiesAndPrices(
          this.$store.getters.getListing(this.$route.params.listing)
        );
      }
    }
  }
</script>
<style>
  .about {
    margin: 2em 0;
  }

  .about h3 {
    font-size: 22px;
  }
  .amenity-not-available {
    color:rgb(223, 7, 36);
    text-decoration-line: line-through;
  }
</style>