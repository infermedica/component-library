import useLink from './index';

const hrefProps = {
  href: 'href link',
  to: 'to link',
  tag: 'li',
} as const;
const toProps = {
  to: 'to link',
  tag: 'li',
} as const;

const tagProps = { tag: 'li' } as const;

describe('composable/useLink', () => {
  test('return correct component tag when parameter has property href', () => {
    const { componentTag } = useLink(hrefProps);
    expect(componentTag.value).toBe('a');
  });
  test('return correct component tag when parameter has property to', () => {
    const { componentTag } = useLink(toProps);
    expect(componentTag.value).toBe('router-link');
  });
  test('return correct component tag when parameter has property tag', () => {
    const { componentTag } = useLink(tagProps);
    expect(componentTag.value).toBe('li');
  });
  test("return undefined when parameter doesn't have any property", () => {
    const { componentTag } = useLink({});
    expect(componentTag.value).toBe(undefined);
  });
  test('return correct default attributes when parameter has only property href', () => {
    const { routeAttrs } = useLink(hrefProps);
    expect(routeAttrs.value).toStrictEqual({
      href: hrefProps.href,
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });
  test('return correct attributes when parameter has property href', () => {
    const { routeAttrs } = useLink({
      ...hrefProps,
      rel: 'rel link',
      target: 'target link',
    });
    expect(routeAttrs.value).toStrictEqual({
      href: hrefProps.href,
      target: 'target link',
      rel: 'rel link',
    });
  });
  test('return correct attributes when parameter has property to', () => {
    const { routeAttrs } = useLink(toProps);
    expect(routeAttrs.value).toStrictEqual({ to: toProps.to });
  });
  test("return empty object when parameter doesn't have property href and to", () => {
    const { routeAttrs } = useLink(tagProps);
    expect(routeAttrs.value).toStrictEqual({});
  });
  test('return empty route attrs when parameter property href is undefined', () => {
    const undefinedAttrs = useLink({ href: undefined }).routeAttrs.value;
    expect(undefinedAttrs).toStrictEqual({});
  });
  test('return empty route attrs when parameter property to is undefined', () => {
    const undefinedAttrs = useLink({ to: undefined }).routeAttrs.value;
    expect(undefinedAttrs).toStrictEqual({});
  });
});
