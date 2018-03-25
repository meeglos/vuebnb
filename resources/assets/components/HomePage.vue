<template>
  <div>Vuebnb home page</div>
</template>
<script>
  import { groupByCountry } from '../js/helpers';

  let serverData = JSON.parse(window.vuebnb_server_data);
  let listing_groups = groupByCountry(serverData.listings);

  export default {
    data() {
      return { listing_groups }
    }
  }
</script>