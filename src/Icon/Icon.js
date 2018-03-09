import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';

export const styles = theme => ({
  root: {
    userSelect: 'none',
    fontSize: 24,
    width: '1em',
    height: '1em',
  },
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorAction: {
    color: theme.palette.action.active,
  },
  colorDisabled: {
    color: theme.palette.action.disabled,
  },
  colorError: {
    color: theme.palette.error.main,
  },
  marginNormal: {
    margin: `auto ${theme.spacing.unit}px}`,
  },
  marginDense: {
    margin: `auto ${theme.spacing.unit / 2}px}`,
  },
});

function Icon(props) {
  const { children, classes, className, color, margin, ...other } = props;

  return (
    <span
      className={classNames(
        'material-icons',
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'inherit',
          [classes[`margin${capitalize(margin)}`]]: margin !== 'none',
        },
        className,
      )}
      aria-hidden="true"
      {...other}
    >
      {children}
    </span>
  );
}

Icon.propTypes = {
  /**
   * The name of the icon font ligature.
   */
  children: PropTypes.node,
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['inherit', 'secondary', 'action', 'disabled', 'error', 'primary']),
  /**
   * If `dense` or `normal`, will adjust horizontal margin spacing with direct siblings.
   */
  margin: PropTypes.oneOf(['none', 'dense', 'normal']),
};

Icon.defaultProps = {
  color: 'inherit',
  margin: 'none',
};

Icon.muiName = 'Icon';

export default withStyles(styles, { name: 'MuiIcon' })(Icon);
