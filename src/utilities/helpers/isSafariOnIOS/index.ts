// eslint-disable-next-line import/prefer-default-export
export function isSafariOnIOS(): boolean {
  const { userAgent } = navigator;

  return /iP(hone|ad|od)/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome/.test(userAgent);
}
