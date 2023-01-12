import type iconList from '../components/atoms/UiIcon/icons';

export type IconAsString = typeof iconList[number] | '';
export type Icon = IconAsString | SVGElement | undefined;
