import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000, // 10 seconds
    requestTimeout: 10000, // Timeout for HTTP requests
    responseTimeout: 10000, // Timeout for receiving responses
    baseUrl: 'http://localhost:3000',//'https://dev.lms.lerero.com',localhost:3000/
  },
});