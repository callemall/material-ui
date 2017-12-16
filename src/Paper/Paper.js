import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import withStyles from '../styles/withStyles';
import * as warning from 'warning';

export const styles = theme => {
  const shadows = {};
  theme.shadows.forEach((shadow, index) => {
    shadows[`shadow${index}`] = {
      boxShadow: shadow,
    };
  });

  return {
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    rounded: {
      borderRadius: 2,
    },
    ...shadows,
  };
};

function Paper(props) {
  const {
    classes,
    className: classNameProp,
    component: ComponentProp,
    square,
    elevation,
    ...other
  } = props;

  warning(
    elevation >= 0 && elevation < 25,
    `Material-UI: this elevation \`${elevation}\` is not implemented.`,
  );

  const className = classNames(
    classes.root,
    classes[`shadow${elevation >= 0 ? elevation : 0}`],
    {
      [classes.rounded]: !square,
    },
    classNameProp,
  );

  return <ComponentProp className={className} {...other} />;
}

Paper.propTypes = {
  /**
   * @ignore
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
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It's accepting values between 0 and 24 inclusive.
   */
  elevation: PropTypes.number,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: PropTypes.bool,
};

Paper.defaultProps = {
  component: 'div',
  elevation: 2,
  square: false,
};

export default withStyles(styles, { name: 'MuiPaper' })(Paper);
