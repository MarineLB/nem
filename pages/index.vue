<template>
  <div class="page homepage">
    <div
      class="home-site-title h4"
      v-html="$prismic.asHtml(document.site_title)"
    ></div>
    <div class="content" v-html="$prismic.asHtml(document.text)" />
    <div class="cta">
      <Button type="full" size="large" @click="clickCTA"
        >Get a free sample master</Button
      >
    </div>
    <!-- <div class="image-container">
      <img loading="lazy" :src="document.image.url" :alt="document.image.alt" />
    </div> -->
    <section
      v-for="(slice, index) in slices"
      :key="index"
      class="component-wrapper"
    >
      <componentWrapper :type="slice.slice_type" :data="slice" />
    </section>
    
    <section class="blog_teaser" v-if="posts && posts.length > 0">
      <h2>Latest articles on the blog</h2>
      <BlogList :posts="posts"></BlogList>
      <router-link to="/blog">See all articles</router-link>
    </section>
    <br><br>
  </div>
</template>

<script>
import Button from "@/components/button.vue";
import BlogList from "@/components/blogList.vue";
import componentWrapper from "@/components/componentWrapper.vue";
export default {
  components: {
    componentWrapper,
    Button,
    BlogList
  },
  data() {
    return {
      slices: [],
      posts: null
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
          content: this.document.meta_description,
        },
        {
          name: "og:title",
          content: this.document.meta_title || this.document.title[0].text,
        },
        { name: "og:description", content: this.document.meta_description },
        { name: "og:type", content: "website" },
      ],
    };
  },
  // homepage type
  async asyncData({ app, error }) {
    let document = await app.$prismic.api.query(
      app.$prismic.predicates.at("document.type", "homepage")
    );
    let blog = await app.$prismic.api.query(
      app.$prismic.predicates.at("document.type", "blog_post"),
      {pageSize: 5}
    );

    if (document) {
      const page = document.results[0].data;
      const posts = blog.results;
      return { document: page, slices: page.body, posts };
    } else {
      error({ statusCode: 404, message: "You're lost" });
    }
  },
  methods: {
    clickCTA() {
      this.$ga.event({
        eventCategory: 'CTA home',
        eventAction: 'click',
        eventLabel: 'Clicked on home CTA',
      });
      this.$router.push('/contact');
    }
  }
};
</script>

<style lang="scss">
.homepage .content{
  max-width: 669px;
}
.content {
  margin-top: $base-margin;
}
.cta {
  margin-top: $margin-md;
}
.image-container {
  margin-top: $margin-lg;
  // margin-left: calc(#{$margin-sm} * -1);
  // margin-right: calc(#{$margin-sm} * -1);
  // margin-bottom: calc(#{$margin-sm} * -1);

  @include breakpoint(small) {
    // margin-left: calc(#{$margin-md} * -1);
    // margin-right: calc(#{$margin-md} * -1);
    // margin-bottom: calc(#{$margin-md} * -1)
    margin-bottom: $margin-md;
  }
}

</style>
