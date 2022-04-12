<template>
  <div class="page">
    <nuxt-link to="/home">← Homepage</nuxt-link>
    <h1 class="h2" v-if="document">
      {{ $prismic.asText(document.page_title) }}
    </h1>
    <div
      class="content"
      v-if="document"
      v-html="$prismic.asHtml(document.text)"
    />
    <div id="hubspotForm" v-once></div>
  </div>
</template>
<script>
export default {
  async asyncData({ app, error, payload }) {
    if (payload) {
      const page = payload.data;
      return { document: page, slices: page.body };
    } else {
      let document = await app.$prismic.api.getByUID("page", "contact");

      if (document) {
        const page = document.data;
        return { document: page, slices: page.body };
      } else {
        error({ statusCode: 404, message: "You're lost" });
      }
    }
  },
  mounted() {
    if (process.client) {
      const script = document.createElement("script");
      script.src = "https://js.hsforms.net/forms/v2.js";
      document.body.appendChild(script);
      script.addEventListener("load", () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            region: "eu1",
            portalId: "25032422",
            formId: "d507eaae-6676-4fc6-913b-13ccb6febf03",
            target: "#hubspotForm",
          });
        }
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.h4 {
  margin-bottom: $margin-sm;
}
</style>