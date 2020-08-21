import * as React from 'react';
import { StandardProps } from '..';

export interface GridListTileBarProps extends StandardProps<{}, GridListTileBarClassKey> {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon?: React.ReactNode;
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: 'left' | 'right';
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `titlePosition="bottom"`. */
    titlePositionBottom?: string;
    /** Styles applied to the root element if `titlePosition="top"`. */
    titlePositionTop?: string;
    /** Styles applied to the root element if a `subtitle` is provided. */
    rootSubtitle?: string;
    /** Styles applied to the title and subtitle container element. */
    titleWrap?: string;
    /** Styles applied to the container element if `actionPosition="left"`. */
    titleWrapActionPosLeft?: string;
    /** Styles applied to the container element if `actionPosition="right"`. */
    titleWrapActionPosRight?: string;
    /** Styles applied to the title container element. */
    title?: string;
    /** Styles applied to the subtitle container element. */
    subtitle?: string;
    /** Styles applied to the actionIcon if supplied. */
    actionIcon?: string;
    /** Styles applied to the actionIcon if `actionPosition="left"`. */
    actionIconActionPosLeft?: string;
  };
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: React.ReactNode;
  /**
   * Title to be displayed on tile.
   */
  title?: React.ReactNode;
  /**
   * Position of the title bar.
   */
  titlePosition?: 'top' | 'bottom';
}

export type GridListTileBarClassKey =
  | 'root'
  | 'titlePositionBottom'
  | 'titlePositionTop'
  | 'rootSubtitle'
  | 'titleWrap'
  | 'titleWrapActionPosLeft'
  | 'titleWrapActionPosRight'
  | 'title'
  | 'subtitle'
  | 'actionIcon'
  | 'actionIconActionPosLeft';

/**
 *
 * Demos:
 *
 * - [Grid List](https://material-ui.com/components/grid-list/)
 *
 * API:
 *
 * - [GridListTileBar API](https://material-ui.com/api/grid-list-tile-bar/)
 */
export default function GridListTileBar(props: GridListTileBarProps): JSX.Element;
