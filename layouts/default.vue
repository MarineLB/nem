<template>
  <div class="layout">
    <h1>niclas erlandsson</h1>
    <h2>niclas erlandsson</h2>
    <h3>niclas erlandsson</h3>
    <h4>niclas erlandsson</h4>
    <p>
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
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
body {
  font-family: $body-type;
  font-weight: $body-type-weight;
  line-height: $body-type-line-height;
  letter-spacing: $body-type-letter-spacing;
  color: $primary-color;
  font-size: $base-text-size;
  @include breakpoint(medium) {
    font-size: $base-text-size;
  }
}

h1,
h2,
h3,
h4 {
  font-family: $heading-type;
  font-weight: $heading-type-weight;
  line-height: $heading-type-line-height;
  letter-spacing: $heading-type-letter-spacing;
  color: $primary-color;
  margin-bottom: var(--space-xxs);
}
h1 {
  font-size: $mobile-text-xxl;
  @include breakpoint(medium) {
    font-size: $text-xxl;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio} * #{$text-scale-ratio} *
        #{$text-scale-ratio}
    );
  }
}
h2 {
  font-size: $mobile-text-xl;
  @include breakpoint(medium) {
    font-size: $text-xl;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio} * #{$text-scale-ratio}
    );
  }
}
h3 {
  font-size: $mobile-text-lg;
  @include breakpoint(medium) {
    font-size: $text-lg;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio}
    );
  }
}
h4 {
  font-size: $mobile-text-md;
  letter-spacing: calc(#{$heading-type-letter-spacing} / #{$text-scale-ratio});
  @include breakpoint(medium) {
    font-size: $text-md;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} / #{$text-scale-ratio}
    );
  }
}
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
