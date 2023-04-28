<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="Something went wrong"
      >{{ error }}</base-dialog
    >
    <section>
      <coach-filter @filter-coaches="setActiveFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register"
            >Login to Register as Coach</base-button
          >
          <base-button v-if="isLoggedIn && !isCoach" link to="/register"
            >Register as Coach</base-button
          >
        </div>
        <base-spinner v-if="isLoading"></base-spinner>
        <section v-if="!isLoading && hasCoaches">
          <ul>
            <coach-item
              v-for="coach in filteredCoaches"
              :key="coach.id"
              :id="coach.id"
              :firstname="coach.firstName"
              :lastname="coach.lastName"
              :rate="coach.hourlyRate"
              :areas="coach.areas"
            ></coach-item>
          </ul>
        </section>
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
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error || "Something went wrong";
      }
      this.isLoading = false;
    },
    setActiveFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];

      const filteredCoaches = coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });

      return filteredCoaches;
    },
    hasCoaches() {
      return this.$store.getters["coaches/hasCoaches"];
    },
    isLoggedIn() {
      return this.$store.getters["isAuthenticated"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
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
