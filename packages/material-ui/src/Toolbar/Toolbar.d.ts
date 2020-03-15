import * as React from 'react';
import { StandardProps } from '..';

export interface ToolbarProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ToolbarClassKey> {
  component?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  disableGutters?: boolean;
  variant?: 'regular' | 'dense';
}

export type ToolbarClassKey = 'root' | 'gutters' | 'regular' | 'dense';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/app-bar/ App Bar}
 *
 * API:
 * - {@link https://material-ui.com/api/Toolbar Toolbar API}
 *
 */
declare const Toolbar: React.ComponentType<ToolbarProps>;

export default Toolbar;
