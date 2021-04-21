import './tailwindcss.css';
import '@/styles/styles.scss';
import { createRouter, createWebHistory } from 'vue-router';
import { app } from '@storybook/vue3';
const routes = []
const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router);
document.body.onload = function() {
  document.body.setAttribute('dir', 'ltr')
};
