import * as React from 'react';
import { TabsTypeMap, TabsClassKey } from '@material-ui/core/Tabs';
import { Omit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface TabListTypeMap<
  P = {},
  D extends React.ElementType = TabsTypeMap['defaultComponent']
> {
  props: P & Omit<TabsTypeMap['props'], 'value'>;
  defaultComponent: D;
  classKey: TabListClassKey;
}
/**
 *
 * API:
 *
 * - [TabList API](https://material-ui.com/api/tab-list/)
 */
declare const TabList: OverridableComponent<TabListTypeMap>;

export type TabListClassKey = TabsClassKey;

export type TabListProps<
  D extends React.ElementType = TabListTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TabListTypeMap<P, D>, D>;

export default TabList;
