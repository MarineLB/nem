<template>
  <div class="page">
    <div class="home-site-title" v-html="$prismic.asHtml(document.site_title)"></div>
    <section v-for="(slice, index) in slices" :key="index" class="component-wrapper">
      <componentWrapper :type="slice.slice_type" :data="slice" />
    </section>
  </div>
</template>

<script>
import componentWrapper from "@/components/componentWrapper.vue";
export default {
  components: {
    componentWrapper
  },
  data() {
    return {
      slices: []
    };
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
        { name: "og:type", content: "website" },
        { name: "og:url", content: "https://SITENAME.com" }
      ]
    };
  },
  // homepage type
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.query(
      app.$prismic.predicates.at("document.type", "homepage")
    );

    if (document) {
      const page = document.results[0].data;
      return { document: page, slices: page.body };
    } else {
      error({ statusCode: 404, message: "Page introuvable" });
    }
  }
};
</script>

<style lang="scss">
.home-site-title h1 {
  word-spacing: 500px;
}
</style>
