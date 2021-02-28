import * as React from 'react';
import { expect } from 'chai';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import PaginationItem from './PaginationItem';
import classes from './paginationItemClasses';

describe('<PaginationItem />', () => {
  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<PaginationItem />, () => ({
    classes,
    inheritComponent: 'button',
    render,
    mount,
    muiName: 'MuiPaginationItem',
    refInstanceof: window.HTMLButtonElement,
    testDeepOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'foo' },
    testStateOverrides: { prop: 'variant', value: 'outlined', styleKey: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render', () => {
    const { container } = render(<PaginationItem />);
    expect(container.firstChild).to.have.class(classes.root);
  });

  it('should add the `selected` class to the root element if `selected={true}`', () => {
    const { getByRole } = render(<PaginationItem selected />);

    expect(getByRole('button')).to.have.class(classes.selected);
  });

  describe('prop: disabled', () => {
    it('should add the `disabled` class to the root element if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.class(classes.disabled);
    });

    it('should render a disabled button if `disabled={true}`', () => {
      const { getByRole } = render(<PaginationItem disabled />);

      expect(getByRole('button')).to.have.property('disabled', true);
    });
  });

  it('should render a small button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="small" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).to.have.class(classes.sizeSmall);
    expect(root).not.to.have.class(classes.sizeLarge);
  });

  it('should render a large button', () => {
    const { getByTestId } = render(
      <PaginationItem data-testid="root" size="large" page={1}>
        Hello World
      </PaginationItem>,
    );

    const root = getByTestId('root');
    expect(root).to.have.class(classes.root);
    expect(root).not.to.have.class(classes.sizeSmall);
    expect(root).to.have.class(classes.sizeLarge);
  });
});
