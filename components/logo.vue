<template>
  <nuxt-link to="/" class="logo">
    <img :src="settings.logo.url" :alt="settings.logo.alt" />
  </nuxt-link>
</template>
<script>
export default {
  computed: {
    settings() {
      return this.$store.state.settings.settings.data;
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  width: 50px;
  @include breakpoint(medlarge) {
    width: 75px;
  }

  img {
    transition: all 0.2s ease-out;
    box-shadow: 0px 0px 0px 1px black;
  }
  &:hover {
    img {
      box-shadow: 0px 0px 0px 3px black;
    }
  }
}
</style>
