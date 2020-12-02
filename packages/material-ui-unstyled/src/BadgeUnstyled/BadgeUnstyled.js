import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize, usePreviousProps } from '@material-ui/utils';
import isHostComponent from '../utils/isHostComponent';
import badgeClasses, { getBadgeUtilityClass } from './badgeClasses';

const useBadgeClasses = (props, extendClasses) => {
  const classes = (extendClasses ? extendClasses(props) : props.classes) || {};
  const { variant, anchorOrigin, overlap, invisible } = props;

  const utilityClasses = {
    root: clsx(badgeClasses['root'], classes['root']),
    badge: clsx(
      badgeClasses['badge'],
      classes['badge'],
      getBadgeUtilityClass(variant),
      badgeClasses[
        `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
          anchorOrigin.horizontal,
        )}${capitalize(overlap)}`
      ],
      classes[
        `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(
          anchorOrigin.horizontal,
        )}${capitalize(overlap)}`
      ],
      {
        [badgeClasses['invisible']]: invisible,
        [classes.invisible]: invisible,
      },
    ),
  };

  return utilityClasses;
};

const BadgeUnstyled = React.forwardRef(function BadgeUnstyled(props, ref) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: 'top',
      horizontal: 'right',
    },
    badgeContent: badgeContentProp,
    children,
    className,
    components = {},
    componentsProps = {},
    invisible: invisibleProp,
    max: maxProp = 99,
    overlap: overlapProp = 'rectangular',
    showZero = false,
    variant: variantProp = 'standard',
    styleProps: stylePropsProp = {},
    extendClasses,
    /* eslint-disable react/prop-types */
    theme,
    ...other
  } = props;

  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    badgeContent: badgeContentProp,
    max: maxProp,
    overlap: overlapProp,
    variant: variantProp,
    styleProps: stylePropsProp,
  });

  let invisible = invisibleProp;

  if (
    invisibleProp == null &&
    ((badgeContentProp === 0 && !showZero) || (badgeContentProp == null && variantProp !== 'dot'))
  ) {
    invisible = true;
  }

  const {
    anchorOrigin = anchorOriginProp,
    badgeContent,
    max = maxProp,
    overlap = overlapProp,
    variant = variantProp,
    styleProps = stylePropsProp,
  } = invisible ? prevProps : props;

  const stateAndProps = {
    ...props,
    anchorOrigin,
    badgeContent,
    invisible,
    max,
    overlap,
    variant,
  };

  let displayValue = '';

  if (variant !== 'dot') {
    displayValue = badgeContent > max ? `${max}+` : badgeContent;
  }

  const classes = useBadgeClasses(stateAndProps, extendClasses);

  const extendedStyleProps = { ...stateAndProps, ...styleProps };

  const Root = components.Root || 'span';
  const rootProps = componentsProps.root || {};

  const Badge = components.Badge || 'span';
  const badgeProps = componentsProps.badge || {};

  return (
    <Root
      {...(!isHostComponent(Root) && {
        styleProps: extendedStyleProps,
        theme,
      })}
      ref={ref}
      {...rootProps}
      {...other}
      className={clsx(classes.root, rootProps.className, className)}
    >
      {children}
      <Badge
        {...(!isHostComponent(Badge) && {
          styleProps: extendedStyleProps,
          theme,
        })}
        {...badgeProps}
        className={clsx(classes.badge, badgeProps.className)}
      >
        {displayValue}
      </Badge>
    </Root>
  );
});

BadgeUnstyled.propTypes = {
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
   * @ignore
   */
  className: PropTypes.string,
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
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['dot', 'standard']),
    PropTypes.string,
  ]),
};

export default BadgeUnstyled;
