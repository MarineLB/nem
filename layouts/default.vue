<template>
  <div class="layout">
    <div class="golden-grid">
      <div class="grid__block grid__block--main">
        <header class="main-header">
          <logo />
        </header>
        <nuxt />
      </div>
      <nuxt-link
        to="/portfolio"
        class="grid__block grid__block--link grid__block--philosophy"
      >
        <div class="content content--portfolio">
          <p>portfolio</p>
          <!-- <player /> -->
          <h2 class="quote h3">The masters are sounding excellent</h2>
          <p class="quote__author">
            <small>- Vinicius Honorio</small>
          </p>
        </div>
      </nuxt-link>
      <nuxt-link
        to="/philosophy"
        class="grid__block grid__block--link grid__block--portfolio"
      >
        philosophy
      </nuxt-link>
      <nuxt-link
        to="/contact"
        class="grid__block grid__block--link grid__block--services"
      >
        get in touch
      </nuxt-link>
      <div class="grid__block grid__block--contact"></div>
      <a
        href="//instagram.com/niclaserlandsson"
        target="_blank"
        class="grid__block grid__block--link grid__block--test1"
        >☞</a
      >
      <div class="grid__block grid__block--test2"></div>
    </div>
  </div>
</template>
<script>
import logo from "@/components/logo";
import player from "~/components/player.vue";
export default {
  components: {
    logo,
    player,
  },
  transition: {
    name: "layout",
    mode: "out-in",
  },
  pageTransition: {
    name: "layout",
    mode: "out-in",
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in",
  },
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: "https://mastering.niclaserlandsson.com" + this.$route.path,
        },
      ],
    };
  },
  methods: {
    async loadSettings() {
      const data = await this.$store.dispatch("settings/getSettings");
    },
  },
  mounted() {
    if (true) {
      this.loadSettings();
    }
  },
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
  position: fixed;
  height: 100%;
  width: 100%;
  //background: $primary-color;
  @include breakpoint(medium) {
    font-size: $base-text-size;
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    background: $secondary-accent;
    border: none;
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: $primary-accent;
  }
  ::-webkit-scrollbar-thumb:active {
    background: $primary-accent;
  }
  ::-webkit-scrollbar-track {
    background: #eee;
    border: none;
    border-radius: 0;
  }
  ::-webkit-scrollbar-track:hover {
    background: #eee;
  }
  ::-webkit-scrollbar-track:active {
    background: #eee;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: $heading-type-weight;
  font-family: $heading-type-fallback;
  font-family: $heading-type;
  line-height: $heading-type-line-height;
  //letter-spacing: $heading-type-letter-spacing;
  color: inherit;
  @include breakpoint(medlarge) {
    letter-spacing: $heading-type-letter-spacing;
  }
}

h1,
h2,
.h2 {
  font-size: $mobile-text-md;
  @include breakpoint(medlarge) {
    font-size: $text-lg;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} * #{$text-scale-ratio}
    );
  }
}
h3,
.h3 {
  font-size: $mobile-text-md;
  letter-spacing: calc(#{$heading-type-letter-spacing} / #{$text-scale-ratio});
  @include breakpoint(medlarge) {
    font-size: $text-md;
    letter-spacing: calc(
      #{$heading-type-letter-spacing} / #{$text-scale-ratio}
    );
  }
}
h4,
.h4,
.h4 > * {
  font-size: $mobile-text-sm;
  letter-spacing: 0;
  @include breakpoint(medlarge) {
    font-size: $text-sm;
    letter-spacing: 0;
  }
}
h5,
.h5 {
  letter-spacing: 0;
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
$height: 93vh;
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

ul {
  list-style-type: circle;
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
  width: 100%;
  height: 100vh;
  display: grid;
  background: $secondary-color;
  grid-template-rows: 61.8% 9.02% 5.58% 23.6%;
  grid-template-columns: 23.6% 5.58% 9.02% 61.8%;
  grid-template-areas:
    "A A A A"
    "D E E B"
    "D G F B"
    "C C C B";

  @include breakpoint("small") {
    width: $width;
    max-width: 98vw;
    height: $height;
    border: $border;
    border-left: 3px solid $primary-color;
    border-right: 3px solid $primary-color;
  }

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
  overflow: hidden;
  padding: $margin-sm;
  transition: all 0.2s ease;
  .content {
    max-width: 500px;
    //white-space: pre-wrap;
  }

  @include breakpoint(small) {
    padding: $margin-md;
  }

  &.nuxt-link-exact-active {
    background: $primary-color;
    color: $secondary-color;
    &:hover {
      color: $secondary-color;
      cursor: initial;
    }
  }

  &--link {
    &:hover {
      //color: $primary-accent;
      box-shadow: inset 0px 0px 0px 5px black;
      //cursor: pointer;
    }
  }

  &--main {
    grid-area: A;
    display: block;
    cursor: initial;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &:hover {
      background: $secondary-color;
      color: $primary-color;
      box-shadow: none;
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

    &:hover {
      color: $secondary-accent;
    }
  }
  &--test2 {
    grid-area: G;
    background: $secondary-accent;
    padding: $margin-xs;
  }
}
.quote__author {
  margin-bottom: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s;
}
.layout-enter,
.layout-leave-active {
  opacity: 0;
}
</style>
