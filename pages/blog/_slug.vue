<template>
  <div class="page">
    <header>
      <nuxt-link to="/blog">← Blog</nuxt-link>
      <h1>{{document.title[0].text}}</h1>
    </header>
    <main>
      <componentWrapper 
        v-for="slice in slices" 
        :key="slice.id" 
        :type="slice.slice_type"
        :data="slice" >
      </componentWrapper>
      <Space :data="{primary: {size: 'large'}}"></Space>
    </main>
    <footer v-if="settings">
      <div v-html="$prismic.asHtml(settings.blog_footer_message)"></div>
      <div class="cta">
        <Button type="full" size="large" @click="clickCTA"
          >{{settings.blog_footer_call_to_action}}</Button
        >
      </div>
    </footer>
  </div>
</template>
<script>
import componentWrapper from "~/components/componentWrapper.vue";
import Button from "@/components/button.vue";
import Space from "@/components/space.vue";
export default {
  components: {
    componentWrapper, Button, Space
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
  },
  computed: {
    settings() {
      if (this.$store.state.settings && this.$store.state.settings.settings) return this.$store.state.settings.settings.data;
    }
  },
  methods: {
    clickCTA() {
      this.$ga.event({
        eventCategory: 'CTA blog',
        eventAction: 'click',
        eventLabel: 'Clicked on blog CTA',
      });
      this.$router.push('/contact');
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
    max-width: 90%;
    font-size: 1.1rem;
}</style>
