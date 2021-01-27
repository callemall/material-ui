import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge } from '@material-ui/utils';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import experimentalStyled from '../styles/experimentalStyled';
import { getFormHelperTextUtilityClasses } from './formHelperTextClasses';
import useThemeProps from '../styles/useThemeProps';

const overridesResolver = (props, styles) => {
  const { styleProps } = props;

  return deepmerge(styles.root || {}, {
    ...(styleProps.error && styles.error),
    ...(styleProps.small && styles.sizeSmall),
    ...(styleProps.contained && styles.contained),
    ...(styleProps.filled && styles.filled),
    ...(styleProps.required && styles.required),
  });
};

const useUtilityClasses = (styleProps) => {
  const { classes, contained, small, disabled, error, filled, focused, required } = styleProps;
  const slots = {
    root: [
      'root',
      error && error,
      disabled && 'disabled',
      error && 'error',
      small && 'sizeSmall',
      contained && 'contained',
      focused && 'focused',
      filled && 'filled',
      required && 'required',
    ],
  };

  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};

const FormHelperTextRoot = experimentalStyled(
  'p',
  {},
  { name: 'MuiFormHelperText', slot: 'Root', overridesResolver },
)(({ theme, styleProps }) => ({
  color: theme.palette.text.secondary,
  ...theme.typography.caption,
  textAlign: 'left',
  marginTop: 3,
  margin: 0,
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
  },
  '&.Mui-error': {
    color: theme.palette.error.main,
  },
  ...(styleProps.size === 'small' && {
    marginTop: 4,
  }),
  ...(styleProps.contained && {
    marginLeft: 14,
    marginRight: 14,
  }),
}));

const FormHelperText = React.forwardRef(function FormHelperText(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiFormHelperText' });
  const {
    children,
    className,
    component = 'p',
    disabled,
    error,
    filled,
    focused,
    margin,
    required,
    variant,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'size', 'disabled', 'error', 'filled', 'focused', 'required'],
  });

  const styleProps = {
    ...props,
    contained: fcs.variant === 'filled' || fcs.variant === 'outlined',
    variant: fcs.variant,
    small: fcs.size === 'small',
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <FormHelperTextRoot
      as={component}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {children === ' ' ? (
        // notranslate needed while Google Translate will not fix zero-width space issue
        // eslint-disable-next-line react/no-danger
        <span className="notranslate" dangerouslySetInnerHTML={{ __html: '&#8203;' }} />
      ) : (
        children
      )}
    </FormHelperTextRoot>
  );
});

FormHelperText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,
  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,
  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,
  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),
  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default FormHelperText;
