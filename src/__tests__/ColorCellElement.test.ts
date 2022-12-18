import ColorCellElement from '../ColorCellElement';

describe('ColorCellElement', () => {
  let element: ColorCellElement;

  beforeEach(() => {
    element = new ColorCellElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render with the correct border color', () => {
    element.cellColor = 'red';
    const container = element.shadowRoot?.getElementById('container');

    expect(container?.style.border).toBe('5px solid red');
  });

  it('should render with the correct background color when isActive is true', () => {
    element.cellColor = 'red';
    element.isActive = true;
    const container = element.shadowRoot?.getElementById('container');

    expect(container?.style.backgroundColor).toBe('red');
  });

  it('should toggle the primary class when isPrimary is true', () => {
    element.isPrimary = true;
    const container = element.shadowRoot?.getElementById('container');

    expect(container?.classList.contains('primary')).toBe(true);
  });
});
