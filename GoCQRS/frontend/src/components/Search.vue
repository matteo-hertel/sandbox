<template>
  <div>
    <input
      @keyup="searchCars"
      v-model.trim="query"
      type="text"
      class="form-control"
      placeholder="Search..."
    />
    <div class="mt-4"><Car v-for="car in cars" :key="car.id" :car="car" /></div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Car from '@/components/Car';

export default {
  data() {
    return {
      query: '',
    };
  },
  computed: mapState({
    cars: state => state.searchResults,
  }),
  methods: {
    searchCars() {
      if (this.query != this.lastQuery) {
        this.$store.dispatch('searchCars', this.query);
        this.lastQuery = this.query;
      }
    },
  },
  components: {
    Car,
  },
};
</script>
