import { mount } from '@vue/test-utils';
import { highlight } from './index';

let wrapper;
const elementP = document.createElement('p');
const Component = {
  template: `<p v-highlight="searchQuery">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
  cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?</p>`,
};
const options = {
  global: { directives: { highlight } },
  data() {
    return { searchQuery: '' };
  },
};

beforeEach(() => {
  wrapper = mount(Component, options);
});

describe('directive/highlight', () => {
  test('no markings if searched query is empty string', async () => {
    const markElements = wrapper.findAll('mark');
    expect(markElements.length).toBe(0);
  });
  test('marking searched query', async () => {
    await wrapper.setData({ searchQuery: 'dolor' });
    const markElements = wrapper.findAll('mark');
    expect(markElements.length).toBe(4);
  });
  test('correct update markings searched query', async () => {
    await wrapper.setData({ searchQuery: 'dolor' });
    let markElements = wrapper.findAll('mark');
    expect(markElements.length).toBe(4);
    await wrapper.setData({ searchQuery: 'Lorem' });
    markElements = wrapper.findAll('mark');
    expect(markElements.length).toBe(1);
  });
  test('no markings if text does not contain searched query', async () => {
    await wrapper.setData({ searchQuery: 'test' });
    const markElements = wrapper.findAll('mark');
    expect(markElements.length).toBe(0);
  });
  test('thrown error when search query is null', async () => {
    expect(() => highlight.beforeMount(elementP, { value: null })).toThrow("Cannot read properties of null (reading 'replace')");
  });
  test('thrown error when search query is undefined', async () => {
    expect(() => highlight.beforeMount(elementP, { value: undefined })).toThrow("Cannot read properties of undefined (reading 'replace')");
  });
});
