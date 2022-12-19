import {
  ReplaySubject, Subject,
} from 'rxjs';
import {
  ColorsConfiguration, IColorRow, IColorsDataLayer, IColorsModel,
} from '../types';
import ColorsModel from '../ColorsModel';

describe('ColorsModel', () => {
  let colorsDataLayer: IColorsDataLayer;
  let colorsModel: IColorsModel;
  let colorsSubject: Subject<ColorsConfiguration>;
  beforeEach(() => {
    colorsSubject = new ReplaySubject(1);
    colorsDataLayer = {
      colors$: colorsSubject,
    };
    colorsModel = ColorsModel(colorsDataLayer);
  });

  it('should return an observable of color rows', () => {
    let result: IColorRow[] = [];
    colorsModel.colorTable$.subscribe((colorRows) => {
      result = colorRows;
    });
    colorsSubject.next([
      ['red', 'blue', 'purple', 'green'],
      ['yellow', 'purple', 'purple', 'orange'],
    ]);

    const expected = [
      {
        cells: [
          { color: 'red', isActive: true },
          { color: 'blue', isActive: true },
          { color: 'purple', isActive: true },
          { color: 'green', isActive: true },
        ],
        primaryColor: 'red',
      },
      {
        cells: [
          { color: 'yellow', isActive: true },
          { color: 'purple', isActive: true },
          { color: 'purple', isActive: true },
          { color: 'orange', isActive: true },
        ],
        primaryColor: 'purple',
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should toggle the active state of the specified color', () => {
    let result: IColorRow[] = [];
    colorsModel.colorTable$.subscribe((colorRows) => {
      result = colorRows;
    });

    colorsSubject.next([
      ['red', 'blue', 'purple', 'green'],
      ['yellow', 'purple', 'purple', 'orange'],
    ]);
    colorsModel.toggleColor('blue');

    const expected = [
      {
        cells: [
          { color: 'red', isActive: true },
          { color: 'blue', isActive: false },
          { color: 'purple', isActive: true },
          { color: 'green', isActive: true },
        ],
        primaryColor: 'red',
      },
      {
        cells: [
          { color: 'yellow', isActive: true },
          { color: 'purple', isActive: true },
          { color: 'purple', isActive: true },
          { color: 'orange', isActive: true },
        ],
        primaryColor: 'purple',
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should update the primary color when toggling a color', () => {
    let result: IColorRow[] = [];
    colorsModel.colorTable$.subscribe((colorRows) => {
      result = colorRows;
    });

    colorsSubject.next([
      ['red', 'blue', 'purple', 'green'],
      ['yellow', 'purple', 'purple', 'orange'],
    ]);
    colorsModel.toggleColor('purple');
    const expected = [
      {
        cells: [
          { color: 'red', isActive: true },
          { color: 'blue', isActive: true },
          { color: 'purple', isActive: false },
          { color: 'green', isActive: true },
        ],
        primaryColor: 'red',
      },
      {
        cells: [
          { color: 'yellow', isActive: true },
          { color: 'purple', isActive: false },
          { color: 'purple', isActive: false },
          { color: 'orange', isActive: true },
        ],
        primaryColor: 'yellow',
      },
    ];

    expect(result).toEqual(expected);
  });
  it('should returns empty string if no colors are active', () => {
    let result: IColorRow[] = [];
    colorsModel.colorTable$.subscribe((colorRows) => {
      result = colorRows;
    });

    colorsSubject.next([
      ['red', 'blue', 'purple', 'green'],
      ['yellow', 'purple', 'purple', 'orange'],
    ]);
    colorsModel.toggleColor('red');
    colorsModel.toggleColor('blue');
    colorsModel.toggleColor('purple');
    colorsModel.toggleColor('green');
    colorsModel.toggleColor('yellow');
    colorsModel.toggleColor('purple');
    colorsModel.toggleColor('purple');
    colorsModel.toggleColor('orange');

    const expected = [
      {
        cells: [
          { color: 'red', isActive: false },
          { color: 'blue', isActive: false },
          { color: 'purple', isActive: false },
          { color: 'green', isActive: false },
        ],
        primaryColor: '',
      },
      {
        cells: [
          { color: 'yellow', isActive: false },
          { color: 'purple', isActive: false },
          { color: 'purple', isActive: false },
          { color: 'orange', isActive: false },
        ],
        primaryColor: '',
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should handle errors from data layer', () => {
    let errorResult;
    colorsModel.colorTable$.subscribe({
      error: (error) => {
        errorResult = error;
      },
    });

    colorsSubject.error(new Error('error'));

    expect(errorResult).toEqual(new Error('error'));
  });
});
