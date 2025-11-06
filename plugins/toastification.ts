import { defineNuxtPlugin } from '#app';
import Toast from 'vue-toastification';
import type { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import * as pkg from 'vue-toastification';
const { POSITION } = pkg;

const options: PluginOptions = {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, options);
});
