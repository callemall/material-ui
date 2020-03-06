import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import usePagination from './usePagination';
import PaginationItem from '../PaginationItem';

export const styles = {
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the ul element. */
  ul: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  },
};

function defaultGetAriaLabel(type, page, selected) {
  if (type === 'page') {
    return `${selected ? '' : 'Go to '}page ${page}`;
  }
  return `Go to ${type} page`;
}

const Pagination = React.forwardRef(function Pagination(props, ref) {
  const {
    boundaryCount,
    classes,
    className,
    color = 'standard',
    count,
    defaultPage,
    disabled,
    getItemAriaLabel: getAriaLabel = defaultGetAriaLabel,
    hideNextButton,
    hidePrevButton,
    onChange,
    page,
    renderItem = item => <PaginationItem {...item} />,
    shape = 'round',
    showFirstButton,
    showLastButton,
    siblingCount,
    size = 'medium',
    variant = 'text',
    ...other
  } = props;

  const { items } = usePagination({ ...props, componentName: 'Pagination' });

  return (
    <nav
      aria-label="pagination navigation"
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <ul className={classes.ul}>
        {items.map((item, index) => (
          <li key={index}>
            {renderItem({
              ...item,
              color,
              'aria-label': getAriaLabel(item.type, item.page, item.selected),
              shape,
              size,
              variant,
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
});

// @default tags synced with default values from usePagination

Pagination.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Number of always visible pages at the beginning and end.
   */
  boundaryCount: PropTypes.number,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The active color.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * The total number of pages.
   */
  count: PropTypes.number,
  /**
   * The page selected by default when the component is uncontrolled.
   */
  defaultPage: PropTypes.number,
  /**
   * If `true`, the pagination component will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current page.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   *
   * @param {string} type The link or button type to format ('page' | 'first' | 'last' | 'next' | 'previous'). Defaults to 'page'.
   * @param {number} page The page number to format.
   * @param {bool} selected If true, the current page is selected.
   * @returns {string}
   */
  getItemAriaLabel: PropTypes.func,
  /**
   * If `true`, hide the next-page button.
   */
  hideNextButton: PropTypes.bool,
  /**
   * If `true`, hide the previous-page button.
   */
  hidePrevButton: PropTypes.bool,
  /**
   * Callback fired when the page is changed.
   *
   * @param {object} event The event source of the callback.
   * @param {number} page The page selected.
   */
  onChange: PropTypes.func,
  /**
   * The current page.
   */
  page: PropTypes.number,
  /**
   * The pagination item component to render.
   *
   * @param {object} params The props to spread on the component.
   * @returns {ReactNode}
   */
  renderItem: PropTypes.func,
  /**
   * The shape of the pagination items.
   */
  shape: PropTypes.oneOf(['round', 'rounded']),
  /**
   * If `true`, show the first-page button.
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   */
  showLastButton: PropTypes.bool,
  /**
   * Number of always visible pages before and after the current page.
   */
  siblingCount: PropTypes.number,
  /**
   * The size of the pagination component.
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['outlined', 'text']),
};

export default withStyles(styles, { name: 'MuiPagination' })(Pagination);
