<template>
  <div class="layout">
    <div class="golden-grid">
      <div class="grid__block grid__block--main">
        <header class="main-header">
          <logo />
        </header>
        <nuxt />
      </div>
      <nuxt-link to="/philosophy" class="grid__block grid__block--philosophy">
        <div class="content">
          <p>philosophy / about</p>
          <h2>I aim to be invisible when i master</h2>
          <p>
            <small>- Ian Sheperd</small>
          </p>
        </div>
      </nuxt-link>
      <nuxt-link to="/services" class="grid__block grid__block--portfolio">
        <div class="content">
          <p>services</p>
        </div>
      </nuxt-link>
      <div class="grid__block grid__block--services"></div>
      <div class="grid__block grid__block--contact"></div>
      <a href="//facebook.com/niclaserland" target="_blank" class="grid__block grid__block--test1">!</a>
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
  font-family: $heading-type-fallback;
  font-family: $heading-type;
  font-weight: $heading-type-weight;
  line-height: $heading-type-line-height;
  letter-spacing: $heading-type-letter-spacing;
  color: inherit;
}

h1 {
  font-size: $mobile-text-xl;
  @include breakpoint(medlarge) {
    font-size: $text-xxl;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio} * #{$text-scale-ratio}
    );
  }
}
h2 {
  font-size: $mobile-text-lg;
  @include breakpoint(medlarge) {
    font-size: $text-lg;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio}
    );
  }
}
h3 {
  font-size: $mobile-text-md;
  letter-spacing: calc(#{$heading-type-letter-spacing} / #{$text-scale-ratio});
  @include breakpoint(medlarge) {
    font-size: $text-md;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} / #{$text-scale-ratio}
    );
  }
}
a {
  color: inherit;
  text-decoration: underline;
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
small {
  font-size: $text-xs;
  letter-spacing: 0;
}

// golden grid
$height: 80vh;
$width-desktop: calc(#{$height}* #{$phi});
$width: calc(#{$height}/ #{$phi});
$border: 2px solid $primary-color;

body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  margin-bottom: $base-margin;
}
.main-header {
  display: flex;
  align-items: center;
  margin-bottom: $base-margin;
}
.back-link {
  position: absolute;
  border-top: 2px solid white;
  border-left: 2px solid white;
  padding: 0.25rem 1rem;
  //font-size: 1em * $phi;
  //font-weight: bold;
  color: white;
  bottom: 0;
  right: 0;
  a {
    text-decoration: none;
  }
}

.golden-grid {
  width: $width;
  max-width: 98vw;
  height: $height;
  border: $border;
  border-left: 3px solid $primary-color;
  border-right: 3px solid $primary-color;
  display: grid;
  background: $secondary-color;
  grid-template-rows: 61.8% 9.02% 5.58% 23.6%;
  grid-template-columns: 23.6% 5.58% 9.02% 61.8%;
  grid-template-areas:
    "A A A A"
    "D E E B"
    "D G F B"
    "C C C B";

  @include breakpoint(medlarge) {
    width: $width-desktop;
    height: $height;
    grid-template-columns: 61.8% 9.02% 5.58% 23.6%;
    grid-template-rows: 61.8% 9.02% 5.58% 23.6%;
    grid-template-areas:
      "A B B B"
      "A E F C"
      "A E G C"
      "A D D C";
  }
}

.grid__block {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  color: inherit;
  text-decoration: none;
  box-sizing: border-box;
  border: $border;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: $margin-md;
  .content {
    max-width: 500px;
    white-space: pre-wrap;
  }

  &.nuxt-link-exact-active {
    background: $primary-color;
    color: $secondary-color;
    &:hover {
      color: $secondary-color;
    }
  }

  &:hover {
    //background: $primary-color;
    color: $primary-accent;
    //cursor: pointer;
  }

  &--main {
    grid-area: A;
    display: block;
    cursor: initial;
    &:hover {
      background: $secondary-color;
      color: $primary-color;
    }
  }
  &--philosophy {
    grid-area: B;
    //display: block;
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
    padding: $margin-xs;
  }
  &--test2 {
    grid-area: G;
    background: $secondary-accent;
    padding: $margin-xs;
  }
}
</style>