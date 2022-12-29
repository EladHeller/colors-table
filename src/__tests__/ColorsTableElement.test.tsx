import React from 'react';
import renderer from 'react-test-renderer';
import ColorCellElement from '../ColorCellElement';
import ColorsTableElement, { ColorsTable } from '../ColorsTableElement';

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

  it('should render the table with the correct number of rows and cells', () => {
    const colors = [{ cells: [{ color: 'yellow', isActive: true }], primaryColor: 'yellow' },
      { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
    ];
    const component = renderer.create(<ColorsTable
      colors={colors} isError={false} onColorClick={jest.fn()}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('should dispatch the correct event when a color cell is clicked', () => {
  //   const colors = [{ cells: [{ color: 'yellow', isActive: true }], primaryColor: 'yellow' },
  //     { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
  //   ];
  //   const onColorClick = jest.fn();
  //   const component = renderer.create(<ColorsTable
  //     colors={colors} isError={false} onColorClick={onColorClick}
  //   />);
  //   renderer.act(() => {
  //     tree.props.onColorClick();
  //   });

  //   const tree = component.toJSON();
  //   expect(onColorClick).toBeCalled();
  // });
  //   let colorFromClick = '';

  //   element.colors = [
  //     { cells: [{ color: 'yellow', isActive: true }, { color: 'red', isActive: true }], primaryColor: 'yellow' },
  //     { cells: [{ color: 'red', isActive: false }], primaryColor: 'red' },
  //   ];

  //   element.colorClicked$.subscribe((color) => {
  //     colorFromClick = color;
  //   });

  //   const shadowRoot = element.shadowRoot as ShadowRoot;
  //   const tableBody = shadowRoot.querySelector('tbody');
  //   const firstRow = tableBody?.children[0] as HTMLTableRowElement;
  //   const firstCell = firstRow.children[1].children[0] as ColorCellElement;
  //   firstCell.click();

  //   expect(colorFromClick).toBe('yellow');
  // });

  it('should render error message if isErrored is true', () => {
    const component = renderer.create(<ColorsTable
      colors={[]} isError
      onColorClick={jest.fn()}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('should render error message even if it creates with isError', () => {
  //   document.body.innerHTML = '';
  //   element = new ColorsTableElement();
  //   element.isErrored = true;
  //   document.body.appendChild(element);

  //   const shadowRoot = element.shadowRoot as ShadowRoot;
  //   const errorMessage = shadowRoot.querySelector('td');

  //   expect(errorMessage?.textContent).toBe('There was an error loading the colors.');
  // });

  it('should render loading message if until there is data', () => {
    const component = renderer.create(<ColorsTable
      colors={[]} isError={false} onColorClick={jest.fn()}
    />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
