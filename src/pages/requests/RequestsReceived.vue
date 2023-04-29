<template>
  <base-card>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="Something went wrong"
      >{{ error }}</base-dialog
    >
    <header>
      <h2>Requests Received</h2>
    </header>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <ul v-else-if="hasRequests">
      <RequestItem
        v-for="request in requestsReceived"
        :key="request.id"
        :email="request.userEmail"
        :message="request.message"
      ></RequestItem>
    </ul>
    <h3 v-else>You haven't recieved any requests yet!</h3>
  </base-card>
</template>

<script>
import RequestItem from "../../components/requests/RequestItem.vue";
export default {
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    requestsReceived() {
      return this.$store.getters["requests/requests"];
    },
    hasRequests() {
      return this.$store.getters["requests/hasRequests"];
    },
  },
  created() {
    this.fetchRequests();
  },
  methods: {
    async fetchRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("requests/fetchRequests");
      } catch (error) {
        this.error = error.message || "Something went wrong";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
header {
  text-align: center;
}
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}
h3 {
  text-align: center;
}
</style>
