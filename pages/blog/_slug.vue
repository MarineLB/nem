<template>
  <div class="page">
    <h1>{{document.title[0].text}}</h1>
    <componentWrapper 
        v-for="slice in slices" 
        :key="slice.id" 
        :type="slice.slice_type"
        :data="slice" >
    </componentWrapper>
    <!-- <div v-for="slice in slices" :key="slice.id" >coucou {{}}</div> -->
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
      title: this.document.title[0].text,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.document.meta_description[0].text
        },
        {
          name: "og:title",
          content: this.document.meta_title
        },
        { name: "og:title", content: this.document.meta_title },
        { name: "og:description", content: this.document.meta_description[0].text },
        { name: "og:type", content: "website" },
        { name: "og:image", content: this.document.image.url },
        { name: "twitter:image", content: this.document.image.url },
        { name: "twitter:description", content: this.document.meta_description[0].text },
      ]
    };
  },
  async asyncData({ app, error, params, payload }) {
    if (payload) {
      const page = payload.data;
      return { document: page, slices: page.body };
    } else {
      let document = await app.$prismic.api.getByUID("blog_post", params.slug);

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
<style lang="scss" scoped>
.page {
    max-width: 90%;
    font-size: 1.1rem;
}</style>
