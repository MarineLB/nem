import pkg from "./package";
import Prismic from "prismic-javascript";
import prismic from "prismic-nuxt";

const SITENAME = "niclaserlandssonmastering";

export default {
  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en"
    },
    title:
      "Electronic music mastering : niclas erlandsson, here to make your tunes shine.",
    meta: [
      { name: "google-site-verification", content:"nhu-L81rwGFB9ZA_Ptf2-KHTkuLLc-OWVtLt7uL9Vmg"}
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "My main mission is to make your tunes shine. Several of my clients have hit #1 on the beatport techno charts and I can help you too."
      }
    ],
    link: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "stylesheet", type: "text/css", href: "/font.css" }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#b2ca36" },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/link-resolver.js"],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/google-analytics",
    "@nuxtjs/style-resources",
    "nuxt-svg-loader",
    [
      "prismic-nuxt",
      {
        endpoint: `https://${SITENAME}.cdn.prismic.io/api/v2`,
        linkResolver: function(doc, ctx) {
          if (doc.type === "homepage") return "/";
          if (doc.type === "page") return "/" + doc.uid;
          return "/";
        }
      }
    ],
    "@nuxtjs/sitemap"
  ],
  sitemap: {
    hostname: "https://mastering.niclaserlandsson.com",
    routes: function() {
      let pages = Prismic.api(`https://${SITENAME}.cdn.prismic.io/api/v2`)
        .then(function(api) {
          return api.query(Prismic.Predicates.at("document.type", "page"));
        })
        .then(
          res => {
            return res.results.map(page => {
              return {
                route: "/" + page.uid,
                payload: page
              };
            });
          },
          function(err) {
            console.log("Something went wrong: ", err);
          }
        );
      let posts = Prismic.api(`https://${SITENAME}.cdn.prismic.io/api/v2`)
        .then(function(api) {
          return api.query(Prismic.Predicates.at("document.type", "news"));
        })
        .then(
          res => {
            return res.results.map(page => {
              return {
                route: "/blog/" + page.uid,
                payload: page
              };
            });
          },
          function(err) {
            console.log("Something went wrong: ", err);
          }
        );

      return Promise.all([pages, posts]).then(values => {
        let pagesRoutes = values[0].map(page => page.route);
        let postsRoutes = values[1].map(post => post.route);
        return [...pagesRoutes, ...postsRoutes, "/", "/thank-you", "/404"];
      });
    }
  },
  styleResources: {
    // your settings here
    scss: ["./assets/scss/**/*.scss", "./assets/scss/breakpoints.scss"]
  },
  googleAnalytics: {
    id: "UA-167231073-2"
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      });
    }
  },
  generate: {
    fallback: true,
    routes: function() {
      let pages = Prismic.api(`https://${SITENAME}.cdn.prismic.io/api/v2`)
        .then(function(api) {
          return api.query(Prismic.Predicates.at("document.type", "page"));
        })
        .then(
          res => {
            return res.results.map(page => {
              return {
                route: "/" + page.uid,
                payload: page
              };
            });
          },
          function(err) {
            console.log("Something went wrong: ", err);
          }
        );
      let posts = Prismic.api(`https://${SITENAME}.cdn.prismic.io/api/v2`)
        .then(function(api) {
          return api.query(Prismic.Predicates.at("document.type", "news"));
        })
        .then(
          res => {
            return res.results.map(page => {
              return {
                route: "/blog/" + page.uid,
                payload: page
              };
            });
          },
          function(err) {
            console.log("Something went wrong: ", err);
          }
        );

      return Promise.all([pages, posts]).then(values => {
        return [
          ...values[0],
          ...values[1],
          ["/", "/thank-you", "/404", "/portfolio"]
        ];
      });
    }
  }
};
