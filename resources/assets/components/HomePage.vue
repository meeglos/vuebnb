<template>
  <div class="home-container">
    <listing-summary-group 
			v-for="(group, country) in listing_groups"	
			:key="country"	:listings="group"	:country="country" class="listing-summary-group"></listing-summary-group>
  </div>
</template>
<script>
	import ListingSummaryGroup from './ListingSummaryGroup.vue';
	import { groupByCountry } from '../js/helpers';

  export default {
		methods: {
				assignData({ listings }) {
					this.listing_groups = groupByCountry(listings);
				},
		},
		computed: {
			listing_groups() {
				return groupByCountry(this.$store.state.listing_summaries);
			}
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