export const highlight = {
  beforeMount(el, binding) {
    el.__highlightHandler__ = function(el, binding) {
      const query = binding.value;
      const content = el.innerHTML.replace(/<\/?mark>/gi, '');
      const marked = content.replace(
        new RegExp(query, 'gi'),
        (match) => {
          return `<mark>${match}</mark>`
        }
      )
      el.innerHTML = marked;
    }
    el.__highlightHandler__(el, binding)
  },
  beforeUnmount(el, binding) {
    el.__highlightHandler__(el, binding)
  }
}
