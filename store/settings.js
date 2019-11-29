import Prismic from "prismic-javascript";

export const state = () => ({
  settings: null
});

export const mutations = {
  SET_SETTINGS(state, data) {
    state.settings = data;
  }
};

export const actions = {
  async getSettings({ commit }) {
    let settings = await this.$prismic.api.query(
      Prismic.Predicates.at("document.type", "general_settings")
    );
    return commit("SET_SETTINGS", settings.results[0]);
  }
};
