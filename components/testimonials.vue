<template>
  <div class="testimonials">
    <div class="testimonial" v-for="item in testimonials" :key="item.author">
      <h4 class="testimonial__quote">
        {{ item.quote }}
      </h4>
      <span class="testimonial__author">- {{ item.author }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["testimonials"],
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