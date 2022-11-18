// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Nuxt3上のTypeScriptの型チェックを厳密にする
  typescript: {
    strict: true,
  },
  // Tailwind CSS をモジュールとして導入
  modules: ["@nuxtjs/tailwindcss"],
});
