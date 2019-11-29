<template>
  <div class="page">
    <section class="content-wrapper">
      <h1>{{ error.statusCode }} : {{ error.message }}</h1>
      <p><error</p>
      <div class="suggestions">
        <div class="contact-form__button-wrapper">
          <a href="/" class="contact-form__button button button--green"
            >Back to home</a
          >
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  props: ["error"],
  layout: "custom-error"
};
</script>

<style lang="scss"></style>
