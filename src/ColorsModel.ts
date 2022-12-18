import {
  map, merge, ReplaySubject, Subject, withLatestFrom,
} from 'rxjs';
import type {
  IColorCell, IColorRow, IColorsDataLayer, IColorsModel,
} from './types';

export function getPrimaryColor(cells: IColorCell[]): string {
  const activeColors = cells.filter((cell) => cell.isActive);
  let highestFrequency = 0;
  let primaryColor = '';
  activeColors.reduce((acc, cell) => {
    const { color } = cell;
    if (!(color in acc)) {
      acc[color] = 0;
    }
    acc[color] += 1;
    if (acc[color] > highestFrequency) {
      highestFrequency = acc[color];
      primaryColor = color;
    }
    return acc;
  }, {} as Record<string, number>);
  return primaryColor;
}

export default function ColorsModel(colorsDataLayer: IColorsDataLayer): IColorsModel {
  const colorChangeSubject = new Subject<string>();
  const colorsTableSubject = new ReplaySubject<IColorRow[]>(1);

  const colorsLoaded$ = colorsDataLayer.colors$.pipe(
    map((colors) => {
      const colorRows = colors.map((colorRow) => {
        const cells = colorRow.map((color) => ({
          color,
          isActive: true,
        }));
        return {
          cells,
          primaryColor: getPrimaryColor(cells),
        };
      });
      return colorRows;
    }),
  );

  const colorToggled$ = colorChangeSubject.pipe(
    withLatestFrom(colorsTableSubject),
    map(([color, colorRows]) => {
      const newColorRows = colorRows.map((colorRow) => {
        const cells = colorRow.cells.map((cell) => {
          if (cell.color === color) {
            return {
              ...cell,
              isActive: !cell.isActive,
            };
          }
          return cell;
        });
        return {
          cells,
          primaryColor: getPrimaryColor(cells),
        };
      });
      return newColorRows;
    }),
  );

  merge(colorsLoaded$, colorToggled$).subscribe((colorRows) => {
    colorsTableSubject.next(colorRows);
  });

  function toggleColor(color: string) {
    colorChangeSubject.next(color);
  }

  return {
    get colorTable$() {
      return colorsTableSubject.asObservable();
    },
    toggleColor,
  };
}
