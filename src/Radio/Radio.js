// @flow weak

import { createStyleSheet } from 'jss-theme-reactor';
import { createSwitch } from '../internal/SwitchBase';
import { withSwitchLabel } from '../internal/SwitchLabel';

export const styleSheet = createStyleSheet('Radio', (theme) => {
  return {
    default: {
      color: theme.palette.text.secondary,
    },
    checked: {
      color: theme.palette.accent[500],
    },
    disabled: {
      color: theme.palette.action.disabled,
    },
  };
});

const Radio = createSwitch({
  styleSheet,
  inputType: 'radio',
  defaultIcon: 'radio_button_unchecked',
  defaultCheckedIcon: 'radio_button_checked',
});

Radio.displayName = 'Radio';

export { Radio };

export default withSwitchLabel(Radio);
