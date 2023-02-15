/* eslint-disable import/prefer-default-export */
export const capitalizeFirst = <T extends string>(string: string) => (typeof string === 'string'
  ? string.replace(/^\p{L}/gmu, (character) => (character.toUpperCase())) as Capitalize<T>
  : string);
