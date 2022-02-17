import './tailwindcss.css';
import './styles.css';
import '@/styles/styles.scss';
import { createRouter, createWebHistory } from 'vue-router';
import { addDecorator, app } from '@storybook/vue3';
import { withTests } from '@storybook/addon-jest';
import results from '../.jest-test-results.json';

const routes = []
const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router);
document.body.onload = function() {
  document.body.setAttribute('dir', 'ltr')
};

addDecorator(
  withTests({
    results,
  })
)