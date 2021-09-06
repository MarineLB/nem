<template>
  <div class="page">
    <h1 class="h4">Get a free sample master</h1>
    <p>
      I offer stereo & stem mastering for both digital and vinyl releases of
      electronic music. In order for me to give you an accurate price for your
      project, please get in touch here.
    </p>
    <div id="hubspotForm" v-once></div>
  </div>
</template>
<script>
export default {
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