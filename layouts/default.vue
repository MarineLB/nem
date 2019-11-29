<template>
  <div class="layout">
    <div class="golden-grid">
      <div class="grid__block grid__block--main">
        <logo />
        <nuxt />
      </div>
      <div class="grid__block grid__block--philosophy">coming</div>
      <div class="grid__block grid__block--portfolio">soon</div>
      <div class="grid__block grid__block--services">as</div>
      <div class="grid__block grid__block--contact">fuck</div>
      <div class="grid__block grid__block--test1">!</div>
      <div class="grid__block grid__block--test2"></div>
    </div>
  </div>
</template>
<script>
import logo from "@/components/logo";
export default {
  components: {
    logo
  },
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
  //background: $primary-color;
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

// golden grid
$height: 90vh;
$width: $height * 1.618;
$border: 2px solid $primary-color;

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.golden-grid {
  width: $width;
  height: $height;
  border: $border;
  border-left: 3px solid $primary-color;
  border-right: 3px solid $primary-color;
  display: grid;
  background: $secondary-color;

  grid-template-columns: 61.8% 9.02% 5.58% 23.6%;
  grid-template-rows: 61.8% 9.02% 5.58% 23.6%;
  grid-template-areas:
    "A B B B"
    "A E F C"
    "A E G C"
    "A D D C";
}

.grid__block {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  box-sizing: border-box;
  border: $border;

  &:hover {
    background: $primary-color;
    color: $secondary-color;
    //cursor: pointer;
  }

  &--main {
    grid-area: A;
    display: block;
    padding: 1em;
    cursor: initial;
    &:hover {
      background: $secondary-color;
    }
  }
  &--philosophy {
    grid-area: B;
  }
  &--portfolio {
    grid-area: C;
  }
  &--services {
    grid-area: D;
  }
  &--contact {
    grid-area: E;
  }
  &--test1 {
    grid-area: F;
    background: $primary-accent;
    color: white;
  }
  &--test2 {
    grid-area: G;
    background: $secondary-accent;
  }
}
</style>
