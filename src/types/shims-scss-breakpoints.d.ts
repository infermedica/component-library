declare module '*breakpoints.module.scss' {
  type breakpoints = 'mobileMaxWidth'
  | 'tabletMinWidth'
  | 'tabletMaxWidth'
  | 'desktopMinWidth'
  | 'toMobile'
  | 'toTablet'
  | 'fromTablet'
  | 'fromDesktop'
  const content: Record<breakpoints, string>;
  export = content;
}
