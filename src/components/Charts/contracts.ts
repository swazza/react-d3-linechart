import React from 'react';
import { Transition } from 'd3-transition';

export interface Point {
  x: number;
  y: number;
}

export const DataContext = React.createContext<Point[] | null>(null);
export const SVGNodeContext = React.createContext<SVGSVGElement | null>(null);
export const TransitionContext = React.createContext<Transition<
  HTMLElement,
  {},
  null,
  undefined
> | null>(null);
