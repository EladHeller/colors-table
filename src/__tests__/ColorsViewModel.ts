import { Subject } from 'rxjs';
import { IColorRow, IColorsModel, IColorsView } from '../types';
import ColorsViewModel from '../ColorsViewModel';

describe('ColorsViewModel', () => {
  let colorsModel: IColorsModel;
  let colorsView: IColorsView;
  let colorsTableSubject: Subject<IColorRow[]>;
  let colorClickedSubject: Subject<string>;

  beforeEach(() => {
    colorsTableSubject = new Subject();
    colorClickedSubject = new Subject();
    colorsModel = {
      colorTable$: colorsTableSubject,
      toggleColor: jest.fn(),
    };

    colorsView = Object.assign(document.createElement('div'), {
      colorClicked$: colorClickedSubject,
      colors: [],
      isErrored: false,
    });
    ColorsViewModel(colorsModel, colorsView);
  });

  it('should toggle the color when a color is clicked', () => {
    colorClickedSubject.next('red');

    expect(colorsModel.toggleColor).toHaveBeenCalledWith('red');
  });

  it('should update the colors in the view when the color table changes', () => {
    const newColorRows = [{ cells: [{ color: 'red', isActive: true }], primaryColor: 'red' }];
    colorsTableSubject.next(newColorRows);
    expect(colorsView.colors).toEqual(newColorRows);
  });

  it('should update the isErrored property in the view when the color table changes', () => {
    colorsTableSubject.error('error');
    expect(colorsView.isErrored).toBe(true);
  });
});
