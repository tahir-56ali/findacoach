<template>
  <div>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog
      :show="!!error"
      title="Something went wrong"
      @close="handleError"
    >
      {{ error }}
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>

        <p v-if="!formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button>{{ buttonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="changeMode">{{
          buttonModeCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      isLoading: false,
      mode: "login",
      formIsValid: true,
    };
  },
  computed: {
    buttonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    buttonModeCaption() {
      return this.mode === "login" ? "Signup Instead" : "Login Instead";
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;
      const formData = {
        email: this.email,
        password: this.password,
        mode: this.mode,
      };

      try {
        await this.$store.dispatch("authenticate", formData);

        const redirect = "/" + (this.$route.query.redirect || "coaches");
        this.$router.replace(redirect);
      } catch (error) {
        this.error = error.message || "Failed to authenticate, try later.";
      }

      this.isLoading = false;
    },
    changeMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
