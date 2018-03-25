<template>
  <div class="home-container">
    <listing-summary-group 
			v-for="(group, country) in listing_groups"	
			:key="country"	:listings="group"	:country="country" class="listing-summary-group"></listing-summary-group>
  </div>
</template>
<script>
	import routeMixin from '../js/route-mixin';
	import ListingSummaryGroup from './ListingSummaryGroup.vue';
	import { groupByCountry } from '../js/helpers';

  // let serverData = JSON.parse(window.vuebnb_server_data);
  // let listing_groups = groupByCountry(serverData.listings);

  export default {
		mixins: [ routeMixin ],
    data() {
			return {
				listing_groups: []
			};
		},
		methods: {
				assignData({ listings }) {
						this.listing_groups = groupByCountry(listings);
				},
		},
		components: {
			ListingSummaryGroup
		}
	}
</script>
<style>
.listing-summaries > .listing-summary {
	margin-right: 15px;
}
.listing-summaries > .listing-summary:last-child {
	margin-right: 0;
}
</style>