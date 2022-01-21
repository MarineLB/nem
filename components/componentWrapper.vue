<template>
  <component v-if="component" :is="component" :data="data" />
</template>
<script>
import camelcase from "camelcase";

const getComponent = (slug) => ({
  component: import(`@/components/${slug}.vue`),
});

export default {
  props: {
    type: {
      type: String,
      default: () => null,
    },
    data: {
      type: Object,
      default: () => [],
    },
  },
  created() {
    if (this.type) {
      const camelType = camelcase(this.type);
      this.component = () => getComponent(camelType);
    }
  },
};
</script>