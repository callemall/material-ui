import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePreviousProps } from '@material-ui/utils';
import {
  BadgeUnstyled,
  badgeClasses as unstyledBadgeClasses,
  getBadgeUtilityClass,
} from '@material-ui/unstyled';
import styled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';

const badgeClasses = {
  ...unstyledBadgeClasses,
  colorError: getBadgeUtilityClass('colorError'),
  colorPrimary: getBadgeUtilityClass('colorPrimary'),
  colorSecondary: getBadgeUtilityClass('colorSecondary'),
};

export { badgeClasses };

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;

const overridesResolver = (props, styles) => {
  const {
    color = 'default',
    variant = 'standard',
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'right',
    },
    invisible,
    overlap = 'rectangular',
  } = props;

  const styleOverrides = {
    ...styles.root,
    [`& .${badgeClasses.badge}`]: {
      ...styles.badge,
      ...styles[variant],
      ...styles[
        `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
          anchorOrigin.horizontal,
        )}${capitalize(overlap)}`
      ],
      ...(color !== 'default' && styles[`color${capitalize(color)}`]),
      ...(invisible && styles.invisible),
    },
  };

  return styleOverrides;
};

const BadgeRoot = styled(
  'span',
  {},
  { muiName: 'MuiBadge', overridesResolver },
)({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0,
});

const BadgeBadge = styled(
  'span',
  {},
  { muiName: 'MuiBadge-badge', overridesResolver },
)((props) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  boxSizing: 'border-box',
  fontFamily: props.theme.typography.fontFamily,
  fontWeight: props.theme.typography.fontWeightMedium,
  fontSize: props.theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: '0 6px',
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1, // Render the badge on top of potential ripples.
  transition: props.theme.transitions.create('transform', {
    easing: props.theme.transitions.easing.easeInOut,
    duration: props.theme.transitions.duration.enteringScreen,
  }),
  ...(props.styleProps.color !== 'default' && {
    backgroundColor: props.theme.palette[props.styleProps.color].main,
    color: props.theme.palette[props.styleProps.color].contrastText,
  }),
  ...(props.styleProps.variant === 'dot' && {
    borderRadius: RADIUS_DOT,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0,
  }),
  ...(props.styleProps.anchorOrigin.vertical === 'top' &&
    props.styleProps.anchorOrigin.horizontal === 'right' &&
    props.styleProps.overlap === 'rectangular' && {
      top: 0,
      right: 0,
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'bottom' &&
    props.styleProps.anchorOrigin.horizontal === 'right' &&
    props.styleProps.overlap === 'rectangular' && {
      bottom: 0,
      right: 0,
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'top' &&
    props.styleProps.anchorOrigin.horizontal === 'left' &&
    props.styleProps.overlap === 'rectangular' && {
      top: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'bottom' &&
    props.styleProps.anchorOrigin.horizontal === 'left' &&
    props.styleProps.overlap === 'rectangular' && {
      bottom: 0,
      left: 0,
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'top' &&
    props.styleProps.anchorOrigin.horizontal === 'right' &&
    props.styleProps.overlap === 'circular' && {
      top: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, -50%)',
      transformOrigin: '100% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, -50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'bottom' &&
    props.styleProps.anchorOrigin.horizontal === 'right' &&
    props.styleProps.overlap === 'circular' && {
      bottom: '14%',
      right: '14%',
      transform: 'scale(1) translate(50%, 50%)',
      transformOrigin: '100% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(50%, 50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'top' &&
    props.styleProps.anchorOrigin.horizontal === 'left' &&
    props.styleProps.overlap === 'circular' && {
      top: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, -50%)',
      transformOrigin: '0% 0%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, -50%)',
      },
    }),
  ...(props.styleProps.anchorOrigin.vertical === 'bottom' &&
    props.styleProps.anchorOrigin.horizontal === 'left' &&
    props.styleProps.overlap === 'circular' && {
      bottom: '14%',
      left: '14%',
      transform: 'scale(1) translate(-50%, 50%)',
      transformOrigin: '0% 100%',
      [`&.${badgeClasses.invisible}`]: {
        transform: 'scale(0) translate(-50%, 50%)',
      },
    }),
  ...(props.styleProps.invisible && {
    transition: props.theme.transitions.create('transform', {
      easing: props.theme.transitions.easing.easeInOut,
      duration: props.theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const extendBadgeClasses = (props) => {
  const {
    styleProps: { color = 'default' },
    classes = {},
  } = props;

  return {
    ...classes,
    badge: clsx(classes.badge, {
      [getBadgeUtilityClass(`color${capitalize(color)}`)]: color !== 'default',
      [classes[`color${capitalize(color)}`]]: color !== 'default',
    }),
  };
};

const Badge = React.forwardRef(function Badge(inputProps, ref) {
  const { isRtl, ...props } = useThemeProps({ props: inputProps, name: 'MuiBadge' });
  const { components = {}, color = 'default', ...other } = props;

  return (
    <BadgeUnstyled
      {...other}
      components={{
        Root: BadgeRoot,
        Badge: BadgeBadge,
        ...components,
      }}
      styleProps={{ color }}
      extendClasses={extendBadgeClasses}
      ref={ref}
    />
  );
});

Badge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired,
  }),
  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,
  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),
  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: PropTypes.object,
  /**
   * If `true`, the badge is invisible.
   */
  invisible: PropTypes.bool,
  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: PropTypes.oneOf(['circular', 'rectangular']),
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dot', 'standard']),
    PropTypes.string,
  ]),
};

export default Badge;
