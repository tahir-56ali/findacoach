<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Something went wrong"
      @close="handleError"
      >{{ error }}</base-dialog
    >
    <section>
      <base-card>
        <h2>Register as a coach now!</h2>
        <coach-form @register-coach="registerCoach"></coach-form>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachForm from "../../components/coaches/CoachForm.vue";

export default {
  components: {
    CoachForm,
  },
  data() {
    return {
      error: null,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async registerCoach(formData) {
      try {
        await this.$store.dispatch("coaches/registerCoach", formData);
      } catch (error) {
        this.error = error.message || "Something went wrong!";
        return;
      }

      this.$router.replace("/coaches");
    },
  },
};
</script>
