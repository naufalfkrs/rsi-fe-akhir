// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" },
      ],
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],

  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },

  colorMode: {
    classSuffix: "",
  },

  css: ["~/assets/css/tailwind.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  plugins: ["~/plugins/api.ts", "~/plugins/pinia-persist.ts"],
  compatibilityDate: "2024-07-14",

  build: {
    transpile: ["vue-toastification"],
  },
});
