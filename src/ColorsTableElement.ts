import { controller } from '@github/catalyst';
import { html, render } from '@github/jtml';
import { fromEvent, map } from 'rxjs';
import { IColorRow, IColorsView } from './types';
import { clearChildren } from './utilities';
import style from './ColorsTableElement.css';
import ColorCellElement from './ColorCellElement';

type ColorClickedCallback = (color: string) => void;

function createColorCell(
  color: string,
  isActive: boolean,
  isPrimary: boolean,
  onClick?: ColorClickedCallback,
) {
  const cellElement = new ColorCellElement();
  cellElement.cellCollor = color;
  cellElement.isActive = isPrimary || isActive;
  cellElement.isPrimary = isPrimary;
  cellElement.addEventListener('click', () => {
    onClick?.(color);
  });
  return cellElement;
}

@controller
export default class ColorsTableElement extends HTMLElement implements IColorsView {
  private tableBody = document.createElement('tbody');

  private colorTable: IColorRow[] = [];

  colorClicked$ = fromEvent(this, 'color-clicked')
    .pipe(
      map((event: Event) => (event as CustomEvent).detail),
    );

  set colors(colors: IColorRow[]) {
    this.colorTable = colors;
    this.renderColorsTable();
  }

  get colors(): IColorRow[] {
    return this.colorTable;
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const table = document.createElement('table');
    shadow.appendChild(table);
    render(html`<thead><tr><th>#</th><th>Colors</th><th>Primary</th></tr></thead>`, table);
    table.appendChild(this.tableBody);

    const styleElement = document.createElement('style');
    styleElement.textContent = style;
    shadow.appendChild(styleElement);
  }

  private onCellClick(color: string) {
    this.dispatchEvent(new CustomEvent('color-clicked', { detail: color }));
  }

  private renderColorsTable() {
    clearChildren(this.tableBody);
    this.colors.forEach((row, i) => {
      const rowElement = document.createElement('tr');
      this.tableBody.appendChild(rowElement);

      const numberCell = document.createElement('td');
      const colorCell = document.createElement('td');
      const primaryColor = document.createElement('td');

      numberCell.textContent = (i + 1).toString();

      row.cells.forEach((cell) => {
        colorCell.appendChild(createColorCell(cell.color, cell.isActive, false, () => {
          this.onCellClick(cell.color);
        }));
      });

      primaryColor.appendChild(createColorCell(row.primaryColor, true, true));

      rowElement.appendChild(numberCell);
      rowElement.appendChild(colorCell);
      rowElement.appendChild(primaryColor);
    });
  }
}
