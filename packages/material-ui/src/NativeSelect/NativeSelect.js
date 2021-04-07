import * as React from 'react';
import PropTypes from 'prop-types';
import NativeSelectInput from './NativeSelectInput';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';
import useThemeProps from '../styles/useThemeProps';

const defaultInput = <Input />;
/**
 * An alternative to `<Select native />` with a much smaller bundle size footprint.
 */
const NativeSelect = React.forwardRef(function NativeSelect(inProps, ref) {
  const props = useThemeProps({ name: 'MuiNativeSelect', props: inProps });
  const {
    children,
    classes,
    IconComponent = ArrowDropDownIcon,
    input = defaultInput,
    inputProps,
    variant,
    ...other
  } = props;

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant'],
  });

  return React.cloneElement(input, {
    // Most of the logic is implemented in `NativeSelectInput`.
    // The `Select` component is a simple API wrapper to expose something better to play with.
    inputComponent: NativeSelectInput,
    inputProps: {
      children,
      classes,
      IconComponent,
      variant: fcs.variant,
      type: undefined, // We render a select. We can ignore the type provided by the `Input`.
      ...inputProps,
      ...(input ? input.props.inputProps : {}),
    },
    ref,
    ...other,
  });
});

NativeSelect.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The option elements to populate the select with.
   * Can be some `<option>` elements.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The icon that displays the arrow.
   * @default ArrowDropDownIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   * @default <Input />
   */
  input: PropTypes.element,
  /**
   * <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes">Attributes</a> applied to the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Callback fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The `input` value. The DOM API casts this to a string.
   */
  value: PropTypes.any,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

NativeSelect.muiName = 'Select';

export default NativeSelect;
