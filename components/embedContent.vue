<template>
  <div class="embed" v-html="data.primary.embed.html"></div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
<style lang="scss" scoped>
.embed {
  position: relative;
  padding-bottom: 56.25%; /* set the aspect ratio here as (height / width) * 100% */
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.embed /deep/ iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
