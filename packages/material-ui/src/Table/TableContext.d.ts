import { Context } from 'react';
import { Padding, Size } from './Table';

interface TableContextProps {
  padding: Padding;
  size: Size;
  stickyHeader: boolean;
}

declare const TableContext: Context<TableContextProps | undefined>;

export default TableContext;
