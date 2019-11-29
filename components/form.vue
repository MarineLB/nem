<template>
  <div class="form__wrapper">
    <form
      netlify
      data-netlify="true"
      action="/thank-you/"
      method="POST"
      name="contact"
      class="contact-form"
      @submit="submit"
    >
      <input type="hidden" name="form-name" value="contact" />
      <div
        class="contact-form__item"
        v-for="item in data.items"
        :key="item.field_title"
      >
        <label class="contact-form__item-label" :for="slug(item.field_title)">
          <span class="contact-form__item-title">{{ item.field_title }}</span>
          <span
            class="contact-form__item-optional"
            v-if="item.required === 'Non'"
            >Facultatif</span
          >
        </label>
        <input
          type="text"
          :name="slug(item.field_title)"
          :id="slug(item.field_title)"
          :required="item.required === 'Oui'"
          v-if="item.field_type === 'Texte'"
        />
        <input
          type="email"
          :name="slug(item.field_title)"
          :id="slug(item.field_title)"
          :required="item.required === 'Oui'"
          v-else-if="item.field_type === 'Email'"
        />
        <input
          type="tel"
          :name="slug(item.field_title)"
          :id="slug(item.field_title)"
          :required="item.required === 'Oui'"
          v-else-if="item.field_type === 'Téléphone'"
        />
        <textarea
          :name="slug(item.field_title)"
          :id="slug(item.field_title)"
          :required="item.required === 'Oui'"
          v-else-if="item.field_type === 'Bloc de texte'"
        />
      </div>
      <div class="contact-form__button-wrapper">
        <button class="contact-form__button button button--green" type="submit">
          Envoyer
        </button>
        <div class="submit-feedback" v-if="feedback"></div>
      </div>
    </form>
    <div class="form__clear"></div>
  </div>
</template>
<script>
import slugg from "slugg";

export default {
  props: {
    data: {
      type: Object,
      default: () => []
    }
  },
  data() {
    return {
      feedback: ""
    };
  },
  methods: {
    fieldType(name) {
      return "";
    },
    slug(title) {
      return slugg(title);
    },
    submit() {
      this.feedback =
        "Merci pour votre message. Nous vous re-contacterons au plus vite.";
    }
  }
};
</script>
<style lang="scss">
.form__wrapper {
  display: flex;
  justify-content: space-around;
}

.form__clear {
  width: 100%;
}

.contact-form {
  min-width: 250px !important;
  width: 470px !important;
  margin-top: 4rem;
}

.contact-form__item {
  margin-bottom: 1rem;
}

.contact-form__item-label {
  display: block;
  margin-bottom: 0.25rem;
}

.contact-form__item-title {
  font-weight: bold;
  color: black;
  margin-right: 0.5rem;
}

.contact-form__item-optional {
  font-size: 0.75rem;
}

input,
textarea {
  border-radius: 4px;
  background: white;
  box-shadow: none;
  font-size: 1rem;
  padding: 0.3rem 0.75rem;
  width: 100%;
}

textarea {
  min-height: 160px;
}
</style>
