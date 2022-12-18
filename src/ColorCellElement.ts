import { attr, controller } from '@github/catalyst';
import style from './ColorCellElement.css';

@controller
export default class ColorCellElement extends HTMLElement {
  @attr cellColor = 'black';

  @attr isActive = false;

  @attr isPrimary = false;

  private container = document.createElement('div');

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const styleElement = document.createElement('style');
    styleElement.textContent = style.toString();
    shadow.appendChild(styleElement);
    shadow.appendChild(this.container);
    this.container.id = 'container';
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.container.style.border = `${this.cellColor} 5px solid`;
    if (this.isActive) {
      this.container.style.backgroundColor = this.cellColor;
    }
    if (this.isPrimary) {
      this.container.classList.toggle('primary', this.isPrimary);
    }
  }
}
