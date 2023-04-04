import { variable as argTypesVariable } from './argTypes/index.js';

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
  return MODIFIERS_MA || []
}
const getVariables = ( style )=> {
  const VARIABLES_RE = /.*/gm;
  const VARIABLES_MA = style.match(VARIABLES_RE);
 return [
   {
     name: '--element-border-color',
     defaultValue: 'red'
   }, {
    name: '--element-background-color',
     defaultValue: 'blue'
  }
 ]
}
// TODO: parse scss to css
export const parseRaw = (source) => {
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
  // TODO: get variables for RAW
  const variables = getVariables(style)
    .reduce((object, {name, defaultValue})=>(
      {
        ...object,
        [name]: argTypesVariable({ defaultValue })
      }
    ), {})
  return {
    modifiers,
    variables
  }
}
