import { clearChildren } from '../utilities';

describe('utilities', () => {
  it('should clear children from a node', () => {
    const node = document.createElement('div');
    node.appendChild(document.createElement('span'));
    node.appendChild(document.createElement('span'));
    node.appendChild(document.createElement('span'));

    clearChildren(node);

    expect(node.children).toHaveLength(0);
  });
});
