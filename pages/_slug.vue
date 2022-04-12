<template>
  <div class="page">
    <nuxt-link to="/">← Homepage</nuxt-link>
    <div class="content" v-html="$prismic.asHtml(document.text)" />
  </div>
</template>
<script>
import componentWrapper from "~/components/componentWrapper.vue";
export default {
  components: {
    componentWrapper
  },
  head() {
    return {
      title: this.document.meta_title || this.document.title[0].text,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.document.meta_description
        },
        {
          name: "og:title",
          content: this.document.meta_title || this.document.title[0].text
        },
        { name: "og:description", content: this.document.meta_description },
        { name: "og:type", content: "website" }
      ]
    };
  },
  async asyncData({ app, error, params, payload }) {
    if (payload) {
      const page = payload.data;
      return { document: page, slices: page.body };
    } else {
      let document = await app.$prismic.api.getByUID("page", params.slug);

      if (document) {
        const page = document.data;
        return { document: page, slices: page.body };
      } else {
        error({ statusCode: 404, message: "You're lost" });
      }
    }
  }
};
</script>
<style lang="scss"></style>
