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
          apiKey: "AIzaSyC-N5MqITRXSHveoiD_PMUKFjOG28SR9zI",
          authDomain: "elecrica1.firebaseapp.com",
          projectId: "elecrica1",
          storageBucket: "elecrica1.appspot.com",
          messagingSenderId: "751558085358",
          appId: "1:751558085358:web:5cfa4ae330402e8c9281ff",
          databaseURL:
            "https://elecrica1-default-rtdb.europe-west1.firebasedatabase.app",
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
