import withSetup from '../../../tests/unit/helper/withSetup';
import useActiveElement from './index';

let result;
let app;

beforeEach(() => {
  [
    result,
    app,
  ] = withSetup(() => useActiveElement());
});

afterEach(() => {
  app.unmount();
});

describe('composable/useActiveElement', () => {
  test('active item is null when no one items is focused', () => {
    document.body.innerHTML = '<input/>';
    expect(result.value).toBe(null);
  });
  test('correct active element on focus', async () => {
    document.body.innerHTML = '<input/>';
    const input = document.querySelector('input');
    await input.focus();
    expect(result.value).toBe(input);
  });
  test('reset active element on blur', async () => {
    document.body.innerHTML = '<input/>';
    const input = document.querySelector('input');
    await input.focus();
    await input.blur();
    expect(result.value).toBe(null);
  });
  test('correct update active element', async () => {
    document.body.innerHTML = '<input/><button></button>';
    const input = document.querySelector('input');
    const button = document.querySelector('button');
    await input.focus();
    expect(result.value).toBe(input);
    await button.focus();
    expect(result.value).toBe(button);
  });
});
