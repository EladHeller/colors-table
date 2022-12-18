import type { Observable } from 'rxjs';

export type ColorsConfiguration = string[][];

export interface IColorsDataLayer {
  colors$: Observable<ColorsConfiguration>;
}

export interface IColorCell {
  color: string;
  isActive: boolean;
}

export interface IColorRow {
  cells: IColorCell[];
  primaryColor: string;
}

export interface IColorsModel {
  colorTable$: Observable<IColorRow[]>;
  toggleColor: (color: string) => void;
}

export interface IColorsView extends HTMLElement {
  colorClicked$: Observable<string>;
  colors: IColorRow[];
}
