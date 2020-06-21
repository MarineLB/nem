<template>
  <div class="page">
    <div class="content">
      <h2>Portfolio</h2>
      <client-only>
        <p>
          Tracks gain-matched at true peak max -0.2dBFS.
        </p>
        <player />
      </client-only>
    </div>

    <div class="testimonials">
      <div class="testimonial" v-for="item in testimonials">
        <h4 class="testimonial__quote">
          {{ item.quote }}
        </h4>
        <span class="testimonial__author">- {{ item.author }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import componentWrapper from "~/components/componentWrapper.vue";
import player from "~/components/player.vue";

export default {
  components: {
    componentWrapper,
    player
  },
  head() {
    return {
      title: "Mastering portfolio - niclas erlandsson",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "A preview of some of my masters."
        },
        {
          name: "og:title",
          content: "page title"
        },
        {
          name: "og:description",
          content: "A preview of some pre-masters and masters"
        },
        { name: "og:type", content: "website" }
      ]
    };
  },
  data() {
    return {
      testimonials: [
        {
          author: "Advanced Human (Gynoid Audio)",
          quote: "I LOVE them man, very, very clean once again, and PUNCHY!!!"
        },
        {
          author: "Vinicius Honorio",
          quote: "The masters are sounding excellent"
        },
        {
          author: "Subjected (PFTA)",
          quote: "Hey man, the masters sounds ace. Thank you."
        },
        {
          author: "Sandro Galli & DJ OGI",
          quote: "Love the masters"
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.testimonials {
  margin-top: auto;
}
.testimonial {
  margin-bottom: 1rem;
  background: black;
  color: white;
  overflow: hidden;
  padding: 0.35rem;
  //white-space: nowrap;
  text-align: center;
  cursor: default;

  &:hover {
    animation: flicker-blue 0.2s infinite;
  }

  &:nth-child(even) {
    &:hover {
      animation: flicker-yellow 0.3s infinite;
    }
  }
}
.testimonial__quote {
  display: inline;
}
.testimonial__author {
  font-size: 0.8rem;
  font-weight: normal;
}

.testimonials__title {
  margin-bottom: 1rem;
}

.hand {
  transform: rotate(90deg);
}

@keyframes flicker-blue {
  0% {
    background: black;
  }
  50% {
    background: $primary-accent;
  }
  100% {
    background: black;
  }
}
@keyframes flicker-yellow {
  0% {
    background: black;
  }
  50% {
    background: $secondary-accent;
  }
  100% {
    background: black;
  }
}
</style>
