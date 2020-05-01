<template>
  <div class="page">
    <div class="content">
      <h2>Portfolio</h2>
      <p>
        This is an example of my work for this person, in this master i did this
        and that and i can write a little bit about it and shit.
      </p>
      <client-only>
        <player />
      </client-only>
    </div>
  </div>
</template>
<script>
import componentWrapper from "~/components/componentWrapper.vue";
import player from "~/components/player.vue";

export default {
  components: {
    componentWrapper,
    player
  },
  head() {
    return {
      title: "Mastering portfolio - niclas erlandsson",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "A preview of some of my masters."
        },
        {
          name: "og:title",
          content: "page title"
        },
        {
          name: "og:description",
          content: "A preview of some pre-masters and masters"
        },
        { name: "og:type", content: "website" }
      ]
    };
  }
};
</script>
<style lang="scss"></style>
