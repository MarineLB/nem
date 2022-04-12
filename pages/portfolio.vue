<template>
  <div class="page">
    <div class="content">
      <nuxt-link to="/">← Homepage</nuxt-link>
      <h1>Portfolio</h1>
    </div>
    <template v-if="document">
      <div class="slice" v-for="slice in slices" :key="slice.id">
        <client-only v-if="slice.slice_type === 'player'">
          <player :data="slice" />
        </client-only>
        <testimonials
          v-if="slice.slice_type === 'testimonials'"
          :testimonials="slice.items"
        />
      </div>
    </template>
    <div
      class="others"
      v-if="document"
      v-html="$prismic.asHtml(document.text)"
    />
  </div>
</template>
<script>
import componentWrapper from "~/components/componentWrapper.vue";
import player from "~/components/player.vue";
import testimonials from "~/components/testimonials.vue";

export default {
  components: {
    componentWrapper,
    player,
    testimonials,
  },
  head() {
    return {
      title: "Mastering portfolio - niclas erlandsson",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "A preview of some of my masters.",
        },
        {
          name: "og:title",
          content: "page title",
        },
        {
          name: "og:description",
          content: "A preview of some pre-masters and masters",
        },
        { name: "og:type", content: "website" },
      ],
    };
  },
  async asyncData({ app, error, params, payload }) {
    if (payload) {
      const page = payload.data;
      return { document: page, slices: page.body };
    } else {
      let document = await app.$prismic.api.getByUID("page", "portfolio");

      if (document) {
        const page = document.data;
        return { document: page, slices: page.body };
      } else {
        error({ statusCode: 404, message: "You're lost" });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.hand {
  transform: rotate(90deg);
}
</style>
