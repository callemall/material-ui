import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Person from '../internal/svg-icons/Person';
import avatarClasses, { getAvatarUtilityClass } from './avatarClasses';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(
    {
      ...styles[styleProps.variant],
      ...(styleProps.colorDefault && styles.colorDefault),
      [`& .${avatarClasses.img}`]: styles.img,
      [`& .${avatarClasses.fallback}`]: styles.fallback,
    },
    styles.root || {},
  );
};

const useUtilityClasses = (styleProps) => {
  const { classes, variant, colorDefault } = styleProps;

  const slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback'],
  };

  return composeClasses(slots, getAvatarUtilityClass, classes);
};

const stringToColor = (styleProps) => {
  let hash = 0;
  let i;
  let color = '';
  const string = styleProps.alt;

  if (styleProps.sx && styleProps.sx.bgcolor) {
    return color;
  }
  if (!string) {
    return color;
  }
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const AvatarRoot = experimentalStyled(
  'div',
  {},
  {
    name: 'MuiAvatar',
    slot: 'Root',
    overridesResolver,
  },
)(({ theme, styleProps }) => {
  const stringColor = stringToColor(styleProps);
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
    ...(styleProps.variant === 'rounded' && {
      borderRadius: theme.shape.borderRadius,
    }),
    ...(styleProps.variant === 'square' && {
      borderRadius: 0,
    }),
    ...(styleProps.colorDefault && {
      color: stringColor
        ? theme.palette.getContrastText(stringColor)
        : theme.palette.background.default,

      backgroundColor:
        stringColor ||
        (theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]),
    }),
  };
});

const AvatarImg = experimentalStyled(
  'img',
  {},
  {
    name: 'MuiAvatar',
    slot: 'Img',
  },
)({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

const AvatarFallback = experimentalStyled(
  Person,
  {},
  {
    name: 'MuiAvatar',
    slot: 'Fallback',
  },
)({
  width: '75%',
  height: '75%',
});

function useLoaded({ src, srcSet }) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };

    return () => {
      active = false;
    };
  }, [src, srcSet]);

  return loaded;
}

const Avatar = React.forwardRef(function Avatar(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAvatar' });
  const {
    alt,
    children: childrenProp,
    className,
    component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    variant = 'circular',
    ...other
  } = props;

  let children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded({ src, srcSet });
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';

  const styleProps = {
    ...props,
    colorDefault: !hasImgNotFailing,
    component,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  if (hasImgNotFailing) {
    children = (
      <AvatarImg
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        styleProps={styleProps}
        className={classes.img}
        {...imgProps}
      />
    );
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <AvatarFallback className={classes.fallback} />;
  }

  return (
    <AvatarRoot
      as={component}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children}
    </AvatarRoot>
  );
});

Avatar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: PropTypes.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rounded', 'square']),
    PropTypes.string,
  ]),
};

export default Avatar;
