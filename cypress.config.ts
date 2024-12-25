import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'a4kjsr',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://awsjameslo.com',
  },
});
