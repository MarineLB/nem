<template>
  <div class="page">
    <nuxt-link to="/">← Homepage</nuxt-link>
    <h1 class="h2" v-if="document">
      {{ $prismic.asText(document.page_title) }}
    </h1>
    <div
      class="content"
      v-if="document"
      v-html="$prismic.asHtml(document.text)"
    />
    <BlogList :posts="posts"></BlogList>
  </div>
</template>
<script>
import BlogList from "@/components/blogList.vue";
export default {
  components: {BlogList},
  async asyncData({ app, error, payload }) {
    if (payload) {
      const page = payload.data;
      return { document: page, slices: page.body };
    } else {
      let document = await app.$prismic.api.getByUID("page", "blog");
      let blog = await app.$prismic.api.query(
        app.$prismic.predicates.at("document.type", "blog_post"),
        {pageSize: 15}
      );

      if (document) {
        const page = document.data;
        const posts = blog.results;
        return { document: page, slices: page.body, posts };
      } else {
        error({ statusCode: 404, message: "You're lost" });
      }
    }
  },
  mounted() {
    
  },
};
</script>
<style lang="scss" scoped>
.h4 {
  margin-bottom: $margin-sm;
}
</style>