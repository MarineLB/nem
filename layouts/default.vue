<template>
  <div class="layout">
    <h1>heading 1</h1>
    <h2>heading 2</h2>
    <h3>heading 3</h3>
    <h4>heading 4</h4>
    <p>body copy</p>
    <nuxt />
  </div>
</template>
<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://SITENAME.com" + this.$route.path
        }
      ]
    };
  },
  methods: {
    async loadSettings() {
      const data = await this.$store.dispatch("settings/getSettings");
    }
  },
  mounted() {
    if (true) {
      this.loadSettings();
    }
  }
};
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
img {
  max-width: 100%;
}
</style>
