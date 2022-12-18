import ColorsDataLayer from './ColorsDataLayer';
import ColorsModel from './ColorsModel';
import ColorsTableElement from './ColorsTableElement';
import ColorsViewModel from './ColorsViewModel';

function main() {
  const root = document.getElementById('root');
  const colorsDataLayer = ColorsDataLayer();
  const colorsModel = ColorsModel(colorsDataLayer);
  const colorsView = new ColorsTableElement();
  ColorsViewModel(colorsModel, colorsView);
  root?.appendChild(colorsView);
}

main();
