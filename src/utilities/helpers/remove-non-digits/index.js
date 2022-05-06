/* eslint-disable import/prefer-default-export */
export const removeNonDigits = (string) => (typeof string === 'string'
  ? string.replace(/\D/g, '')
  : string);
