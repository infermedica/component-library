const getStyle = ( source ) => {
  const STYLE_RE = /<style lang="scss">([\s\S]*)<\/style>/
  const STYLE_MA = source.match(STYLE_RE)
  return STYLE_MA[1] || null;
}
const getComponentName = ( style ) => {
  const NAME_RE = /^\.[\w\S]+/gm;
  const NAME_MA = style.match(NAME_RE);
  return NAME_MA[0].replace(/\./, '') || null;
}
const getModifiers = ( style )=> {
  const MODIFIERS_RE = /^\s\s&--[\w\S]+/gm
  const MODIFIERS_MA = style.match(MODIFIERS_RE)
  return MODIFIERS_MA
}
export const parseSource = (source) => {
  const style = getStyle(source);
  if ( !style ) return;
  const componentName = getComponentName(style);
  // [ '  &--is-disabled', '  &--small', '  &--outlined', '  &--text', '  &--circled', '  &--icon' ]
  const modifiers = getModifiers(style)
    .map( (modifier) => (modifier
      .replace(/&/, componentName))
    )
    .map( (modifier) => (modifier
      .replace(/\s*/, '')))
  return {
    modifiers
  }
}
