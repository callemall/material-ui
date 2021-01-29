import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import TableRow from './TableRow';
import classes from './tableRowClasses';

describe('<TableRow />', () => {
  const mount = createMount();
  const render = createClientRender();

  function renderInTable(node) {
    return render(
      <table>
        <tbody>{node}</tbody>
      </table>,
    );
  }

  describeConformanceV5(<TableRow />, () => ({
    classes,
    inheritComponent: 'tr',
    mount: (node) => {
      const wrapper = mount(
        <table>
          <tbody>{node}</tbody>
        </table>,
      );
      return wrapper.find('tbody').childAt(0);
    },
    render: (node) => {
      const { container, ...rest } = render(<table>{node}</table>);
      return { container: container.firstChild, ...rest };
    },
    muiName: 'MuiTableRow',
    testVariantProps: { variant: 'foo' },
    refInstanceof: window.HTMLTableRowElement,
    testComponentPropWith: 'tr',
    skip: ['componentsProp'],
  }));

  it('should render children', () => {
    const children = <td data-testid="test" />;
    const { getByTestId } = renderInTable(<TableRow>{children}</TableRow>);
    getByTestId('test');
  });

  describe('prop: component', () => {
    it('can render a different component', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.property('nodeName', 'DIV');
    });

    it('sets role="rowgroup"', () => {
      const { container } = render(<TableRow component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'row');
    });
  });
});
