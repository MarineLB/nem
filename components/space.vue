<template>
  <hr class="space" :style="`margin: ${margin} 0`"/>
</template>
<script>
export default {
  props: ["data"],
  computed: {
    margin() {
      const phi = 1.618;
      const base = `(1em * (${phi} / 2))`;
      if (this.data.primary.size === "extra-small") return `calc(${base} / ${phi})`;
      if (this.data.primary.size === 'small') return `calc${base}`;
      if (this.data.primary.size === 'medium') return `calc(${base} * ${phi})`;
      if (this.data.primary.size === 'large') return `calc(${base} * ${phi} * ${phi})`;
    }
  }
};
</script>
<style lang="scss" scoped>
.space {
  border: none;
}
</style>
