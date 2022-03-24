require("dotenv").config();
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",
  ssr: true,
  generate: {
    fallback: true,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "electrica1",
    htmlAttrs: {
      lang: "ru",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: "~/plugins/firebase", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-material-design-icons",
    "@nuxtjs/dotenv",
    [
      "@nuxtjs/firebase",
      {
        // process.env.
        config: {
          apiKey: netlifyapiKey,
          authDomain: netlifyauthDomain,
          projectId: "elecrica1",
          storageBucket: "elecrica1.appspot.com",
          messagingSenderId: netlifymessagingSenderId,
          appId: netlifyappId,
          databaseURL: netlifydatabaseURL,
        },
        services: {
          database: true,
          auth: true, // Just as example. Can be any other service.
        },
      },
    ],
    // ["nuxt-mail",
    // {
    //   message: {
    //     to: "my@mail.ru",
    //   },
    //   smtp: {
    //     host: "electrica.netlify.app",
    //     port: 587,
    //   },
    // }],
  ],
  bootstrapVue: {
    icons: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // vendor: ["firebase"],
};
