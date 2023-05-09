import type { Component } from 'vue';
import type iconList from '../components/atoms/UiIcon/icons';

export type IconName = typeof iconList[number] | '';
export type Icon = IconName | SVGElement | Component | undefined;
