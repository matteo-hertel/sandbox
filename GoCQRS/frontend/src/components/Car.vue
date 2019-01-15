<template>
  <div class="card">
    <div class="card-body">
      <p class="card-text" v-html="body"></p>
      <p class="card-text">
        <small class="text-muted"> {{ time }} </small>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['car'],
  computed: {
    body() {
      return this.car.body;
    },
    time() {
      return Date.parse(this.car.created_at);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 1rem;
}
.card-body {
  padding: 0.5rem;
  p {
    margin-bottom: 0;
  }
}
</style>
