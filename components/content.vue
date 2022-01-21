<template>
  <div class="text" v-html="$prismic.asHtml(data.primary.text)"></div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
