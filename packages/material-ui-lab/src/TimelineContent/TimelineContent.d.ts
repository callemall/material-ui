import * as React from 'react';
import { StandardProps, TypographyProps } from '@material-ui/core';

export interface TimelineContentProps
  extends StandardProps<TypographyProps, TimelineContentClassKey> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * See [CSS API](#css) below for more details.
   */
  classes?: {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the root element if `align="right"`. */
    alignRight?: string;
  };
}

export type TimelineContentClassKey = 'root';

/**
 *
 * Demos:
 *
 * - [Timeline](https://material-ui.com/components/timeline/)
 *
 * API:
 *
 * - [TimelineContent API](https://material-ui.com/api/timeline-content/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
export default function TimelineContent(props: TimelineContentProps): JSX.Element;
