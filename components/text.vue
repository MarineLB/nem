<template>
  <div class="text" v-html="$prismic.asHtml(data.items[0].text1)"></div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
