<template>
  <div>
    <router-link :to="emailLink">{{ email }}</router-link>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ["email", "message"],
  computed: {
    emailLink() {
      return "mailto:" + this.email;
    },
  },
};
</script>
