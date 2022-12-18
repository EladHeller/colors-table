import { IColorsModel, IColorsView } from './types';

export default function ColorsViewModel(colorsModel: IColorsModel, colorsView: IColorsView) {
  colorsView.colorClicked$?.subscribe((color) => {
    colorsModel.toggleColor(color);
  });
  colorsModel.colorTable$.subscribe({
    next: (colorRows) => {
      colorsView.colors = colorRows;
      colorsView.isErrored = false;
    },
    error: () => {
      colorsView.isErrored = true;
    },
  });
}
