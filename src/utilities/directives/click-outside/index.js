export const clickOutside = {
  beforeMount (el, binding) {
    el.__vueClickOutsideHandler__ = (event) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.__vueClickOutsideHandler__)
  },
  beforeUnmount (el) {
    document.removeEventListener('click', el.__vueClickOutsideHandler__)
  }
}
