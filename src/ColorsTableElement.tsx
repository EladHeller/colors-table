import { createRoot, Root } from 'react-dom/client';
import { attr, controller } from '@github/catalyst';
import { fromEvent, map } from 'rxjs';
import { IColorRow, IColorsView } from './types';
import style from './ColorsTableElement.css';

type ColorClickedCallback = (color: string) => void;

interface IColorCellProps {
  cellColor: string;
  isActive: boolean;
  isPrimary?: boolean;
  onClick?: () => void;
}

function ColorCellElement(props: IColorCellProps) {
  const {
    cellColor, isActive, isPrimary, onClick,
  } = props;
  const styleData = {
    backgroundColor: isActive ? cellColor : '',
    border: `${cellColor} 5px solid`,
  };
  return (
    <div
      className={`color-cell ${isActive ? 'active' : ''} ${isPrimary ? 'primary' : ''}`}
      style={styleData}
      onClick={onClick}
    />
  );
}

interface IColorsTableProps {
  colors: IColorRow[];
  onColorClick: ColorClickedCallback;
  isError: boolean;
}

function ColorsTableBody(props: IColorsTableProps) {
  const { colors, onColorClick, isError } = props;
  if (isError) {
    return (
        <tr className='error'>
          <td colSpan={3}>There was an error while loading the colors.</td>
        </tr>
    );
  }
  if (colors.length) {
    return (
      <>
        {colors.map((row, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>
              {row.cells.map((cell, index) => (
                <ColorCellElement
                  key={index}
                  cellColor={cell.color}
                  isActive={cell.isActive}
                  onClick={() => onColorClick(cell.color)}
                />
              ))}
            </td>
            <td>
              <ColorCellElement cellColor={row.primaryColor} isActive isPrimary />
            </td>
          </tr>
        ))}
      </>
    );
  }
  return (
      <tr>
        <td colSpan={3}>loading colors...</td>
      </tr>
  );
}

export function ColorsTable(props: IColorsTableProps) {
  const { colors, onColorClick, isError } = props;

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Colors</th>
          <th>Primary</th>
        </tr>
      </thead>
      <tbody>
      <ColorsTableBody colors={colors} isError={isError} onColorClick={onColorClick}/>
      </tbody>
    </table>
  );
}

@controller
export default class ColorsTableElement extends HTMLElement implements IColorsView {
  private colorTable: IColorRow[] = [];

  private root: Root;

  private tableContainer = document.createElement('div');

  @attr isErrored = false;

  colorClicked$ = fromEvent(this, 'color-clicked')
    .pipe(
      map((event: Event) => (event as CustomEvent).detail),
    );

  set colors(colors: IColorRow[]) {
    this.colorTable = colors;
    this.render();
  }

  get colors(): IColorRow[] {
    return this.colorTable;
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(this.tableContainer);
    const styleElement = document.createElement('style');
    styleElement.textContent = style.toString();
    shadow.appendChild(styleElement);
    this.root = createRoot(this.tableContainer);
    this.root.render(<ColorsTable
      colors={this.colors}
      isError={this.isErrored}
      onColorClick={(color) => this.onCellClick(color)}
    />);
  }

  private onCellClick(color: string) {
    this.dispatchEvent(new CustomEvent('color-clicked', { detail: color }));
  }

  private render() {
    this.root.render(<ColorsTable
      colors={this.colors}
      isError={this.isErrored}
      onColorClick={(color) => this.onCellClick(color)}
    />);
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}
