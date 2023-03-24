/* eslint-disable import/prefer-default-export */
import { createApp } from 'vue';

export const withSetup = (composable: () => void) => {
  let result;
  const app = createApp({
    setup() {
      result = composable();
      // suppress missing template warning
      return (): void => undefined;
    },
  });
  app.mount(document.createElement('div'));
  // return the result and the app instance
  // for testing provide / unmount
  return [
    result,
    app,
  ];
};
