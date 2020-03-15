import * as React from 'react';
import { StandardProps } from '..';

export interface InputAdornmentProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, InputAdornmentClassKey> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disablePointerEvents?: boolean;
  disableTypography?: boolean;
  position: 'start' | 'end';
  variant?: 'standard' | 'outlined' | 'filled';
}

export type InputAdornmentClassKey =
  | 'root'
  | 'filled'
  | 'positionStart'
  | 'positionEnd'
  | 'disablePointerEvents'
  | 'hiddenLabel'
  | 'marginDense';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/text-fields/ Text Fields}
 *
 * API:
 * - {@link https://material-ui.com/api/input-adornment/ InputAdornment API}
 *
 */
declare const InputAdornment: React.ComponentType<InputAdornmentProps>;

export default InputAdornment;
