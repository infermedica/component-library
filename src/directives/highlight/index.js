export const highlight = {
  bind(el, binding) {
    el._highlightHandler = function(el, binding) {
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
    el._highlightHandler(el, binding)
  },
  update(el, binding) {
    el._highlightHandler(el, binding)
  }
}
