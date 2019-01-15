<template>
  <div>
    <form v-on:submit.prevent="createCar">
      <div class="input-group">
        <input
          v-model.trim="carBody"
          type="text"
          class="form-control"
          placeholder="What's happening?"
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit">Car</button>
        </div>
      </div>
    </form>

    <div class="mt-4"><Car v-for="car in cars" :key="car.id" :car="car" /></div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Car from '@/components/Car';

export default {
  data() {
    return {
      carBody: '',
    };
  },
  computed: mapState({
    cars: state => state.cars,
  }),
  methods: {
    createCar() {
      if (this.carBody.length != 0) {
        this.$store.dispatch('createCar', {body: this.carBody});
        this.carBody = '';
      }
    },
  },
  components: {
    Car,
  },
};
</script>
