import * as React from 'react';
import { StandardProps } from '..';
import { TypographyProps } from '../Typography';

export interface ListItemTextProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, ListItemTextClassKey> {
  disableTypography?: boolean;
  inset?: boolean;
  primary?: React.ReactNode;
  primaryTypographyProps?: Partial<TypographyProps>;
  secondary?: React.ReactNode;
  secondaryTypographyProps?: Partial<TypographyProps>;
}

export type ListItemTextClassKey =
  | 'root'
  | 'multiline'
  | 'dense'
  | 'inset'
  | 'primary'
  | 'secondary';

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/lists/ Lists}
 *
 * API:
 * - {@link https://material-ui.com/api/list-item-text/ ListItemText API}
 *
 */
declare const ListItemText: React.ComponentType<ListItemTextProps>;

export default ListItemText;
