<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        @change="filterCoaches"
        v-model="filters.frontend"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="backend"
        @change="filterCoaches"
        v-model="filters.backend"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="career"
        @change="filterCoaches"
        v-model="filters.career"
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["filter-coaches"],
  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    filterCoaches(event) {
      const key = event.target.id;
      const value = event.target.checked;
      const filters = {
        ...this.filters,
        [key]: value,
      };
      this.$emit("filter-coaches", filters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}
.filter-option {
  margin-right: 1rem;
}
.filter-option label,
.filter-option input {
  vertical-align: middle;
}
.filter-option label {
  margin-left: 0.25rem;
}
.filter-option.active label {
  font-weight: bold;
}
</style>
