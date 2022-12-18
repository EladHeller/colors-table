import ColorCellElement from '../ColorCellElement';
import ColorsTableElement, { createColorCell } from '../ColorsTableElement';

describe('ColorsTableElement', () => {
  let element: ColorsTableElement;

  beforeEach(() => {
    element = new ColorsTableElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should correctly get and set the colors property', () => {
    expect(element.colors).toEqual([]);

    const colors = [{ cells: [{ color: 'yellow', isActive: true }], primaryColor: 'yellow' },
      { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
    ];
    element.colors = colors;
    expect(element.colors).toEqual(colors);
  });

  it('should emit the correct value when a color cell is clicked', () => {
    let colorFromClick = '';

    element.colorClicked$.subscribe((color) => {
      colorFromClick = color;
    });

    const cellElement = createColorCell('yellow', false, false, (color) => {
      element.dispatchEvent(new CustomEvent('color-clicked', { detail: color }));
    });
    cellElement.click();

    expect(colorFromClick).toBe('yellow');
  });

  it('should render the table with the correct number of rows and cells', () => {
    element.colors = [
      { cells: [{ color: 'yellow', isActive: true }, { color: 'red', isActive: true }], primaryColor: 'yellow' },
      { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
    ];

    const shadowRoot = element.shadowRoot as ShadowRoot;
    const tableBody = shadowRoot.querySelector('tbody');
    expect(tableBody?.children).toHaveLength(2);

    const firstRow = tableBody?.children[0] as HTMLTableRowElement;
    expect(firstRow.children).toHaveLength(3);
    expect(firstRow.children[0].textContent).toBe('1');
    expect(firstRow.children[1].children).toHaveLength(2);
    expect(firstRow.children[2].children).toHaveLength(1);
  });

  it('should render the table with the correct colors', () => {
    element.colors = [
      { cells: [{ color: 'yellow', isActive: true }, { color: 'red', isActive: true }], primaryColor: 'yellow' },
      { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
    ];

    const shadowRoot = element.shadowRoot as ShadowRoot;
    const tableBody = shadowRoot.querySelector('tbody');
    const firstRow = tableBody?.children[0] as HTMLTableRowElement;
    const secondRow = tableBody?.children[1] as HTMLTableRowElement;
    const firstCell = firstRow.children[1].children[0] as ColorCellElement;
    const secondCell = firstRow.children[1].children[1] as ColorCellElement;
    const primaryCell = firstRow.children[2].children[0] as ColorCellElement;
    const secondRowCell = secondRow.children[1].children[0] as ColorCellElement;
    const secondRowPrimary = secondRow.children[2].children[0] as ColorCellElement;

    expect(firstCell.cellColor).toBe('yellow');
    expect(firstCell.isActive).toBe(true);
    expect(firstCell.isPrimary).toBe(false);
    expect(secondCell.cellColor).toBe('red');
    expect(secondCell.isActive).toBe(true);
    expect(secondCell.isPrimary).toBe(false);
    expect(primaryCell.cellColor).toBe('yellow');
    expect(primaryCell.isActive).toBe(true);
    expect(primaryCell.isPrimary).toBe(true);
    expect(secondRowCell.cellColor).toBe('red');
    expect(secondRowCell.isActive).toBe(false);
    expect(secondRowCell.isPrimary).toBe(false);
    expect(secondRowPrimary.cellColor).toBe('red');
    expect(secondRowPrimary.isActive).toBe(true);
    expect(secondRowPrimary.isPrimary).toBe(true);
  });
  it('should dispatch the correct event when a color cell is clicked', () => {
    let colorFromClick = '';

    element.colors = [
      { cells: [{ color: 'yellow', isActive: true }, { color: 'red', isActive: true }], primaryColor: 'yellow' },
      { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
    ];

    element.colorClicked$.subscribe((color) => {
      colorFromClick = color;
    });

    const shadowRoot = element.shadowRoot as ShadowRoot;
    const tableBody = shadowRoot.querySelector('tbody');
    const firstRow = tableBody?.children[0] as HTMLTableRowElement;
    const firstCell = firstRow.children[1].children[0] as ColorCellElement;
    firstCell.click();

    expect(colorFromClick).toBe('yellow');
  });
});
