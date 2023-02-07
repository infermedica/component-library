import type { Component } from 'vue';

export type HTMLTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap | Component;

export type ListHTMLTag = 'ol'|'ul' | Component;
