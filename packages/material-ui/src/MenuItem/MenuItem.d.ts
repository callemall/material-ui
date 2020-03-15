import { ListItemTypeMap } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';
import { Omit } from '@material-ui/types';

export type MenuItemClassKey = 'root' | 'gutters' | 'selected' | 'dense';

export type MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> = Omit<
  ListItemTypeMap<P, D>,
  'classKey'
> & {
  classKey: MenuItemClassKey;
};

/**
 *
 *
 * Demos:
 * - {@link https://material-ui.com/components/menus/ Menus}
 *
 * API:
 * - {@link https://material-ui.com/api/MenuItem MenuItem API}
 * - inherits {@link https://material-ui.com/api/list-item/ ListItem API}
 */
declare const MenuItem: OverridableComponent<
  MenuItemTypeMap<{ button: false }, MenuItemTypeMap['defaultComponent']>
> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, MenuItemTypeMap['defaultComponent']>>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
