import { deepEqual } from 'fast-equals';

// eslint-disable-next-line import/prefer-default-export
export const equal = <A, B>(a: A, b: B): boolean => (
  deepEqual(
    JSON.parse(JSON.stringify(a)),
    JSON.parse(JSON.stringify(b)),
  )
);
