<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="Something went wrong"
    ></base-dialog>
    <section>
      <coach-filter @filter-coaches="filterCoaches"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register"
            >Login to Register as Coach</base-button
          >
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <coach-item></coach-item>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
  components: {
    CoachFilter,
    CoachItem,
  },
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    loadCoaches(refresh = false) {
      console.log(refresh);
    },
    filterCoaches(filters) {
      console.log(filters);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
