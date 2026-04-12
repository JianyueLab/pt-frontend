import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  routeRules: {
    "/api/v1/**": {
      proxy: `${process.env.API_BASE ?? "https://pt-api.jianyuelab.net"}/api/v1/**`,
    },
  },
  css: ["./app/assets/global.css"],
  modules: ["@nuxt/ui", "@nuxtjs/i18n"],
  icon: {
    serverBundle: {
      collections: ["lucide"],
    },
  },
  vite: {
    plugins: [tailwindcss() as any],
  },
  app: {
    head: {
      title: "Player Tools — JianYueLab",
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", name: "English", file: "en.json" },
      { code: "zh-cn", name: "Chinese", file: "zh-cn.json" },
    ],
  },
});
