/* eslint-disable import/prefer-default-export */
export const capitalizeFirst = (string: string) => (typeof string === 'string'
  ? string.replace(/^\p{L}/gmu, (character) => (character.toUpperCase()))
  : string);
