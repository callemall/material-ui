import * as React from 'react';
import { StandardProps, PropTypes, PropsOf } from '..';
import { ButtonBaseProps } from '../ButtonBase';
import { OverridableComponent } from '../OverridableComponent';

declare const Fab: OverridableComponent<{
  outerProps: ButtonBaseProps & {
    color?: PropTypes.Color;
    disabled?: boolean;
    disableFocusRipple?: boolean;
    disableRipple?: boolean;
    href?: string;
    size?: 'small' | 'medium' | 'large';
    type?: string;
    variant?: 'round' | 'extended';
  };
  defaultComponent: 'button';
  classKey: FabClassKey;
}>;

export type FabProps = PropsOf<typeof Fab>;

export type FabClassKey =
  | 'root'
  | 'label'
  | 'primary'
  | 'secondary'
  | 'extended'
  | 'focusVisible'
  | 'disabled'
  | 'colorInherit'
  | 'sizeSmall'
  | 'sizeMedium';

export default Fab;
