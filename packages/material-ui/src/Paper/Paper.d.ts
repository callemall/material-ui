import * as React from 'react';
import { OverridableStringUnion } from '@material-ui/types';
import { StandardProps } from '..';

export interface PaperPropsVariantOverrides {}
export type PaperVariantDefaults = Record<'elevation' | 'outlined', true>;

export interface PaperProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaperClassKey> {
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
    /** Styles applied to the root element if `square={false}`. */
    rounded?: string;
    /** Styles applied to the root element if `variant="outlined"`. */
    outlined?: string;
    /** Styles applied to the root element if `variant="elevation"`. */
    elevation?: string;
    elevation0?: string;
    elevation1?: string;
    elevation2?: string;
    elevation3?: string;
    elevation4?: string;
    elevation5?: string;
    elevation6?: string;
    elevation7?: string;
    elevation8?: string;
    elevation9?: string;
    elevation10?: string;
    elevation11?: string;
    elevation12?: string;
    elevation13?: string;
    elevation14?: string;
    elevation15?: string;
    elevation16?: string;
    elevation17?: string;
    elevation18?: string;
    elevation19?: string;
    elevation20?: string;
    elevation21?: string;
    elevation22?: string;
    elevation23?: string;
    elevation24?: string;
  };
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>;
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   */
  elevation?: number;
  /**
   * If `true`, rounded corners are disabled.
   */
  square?: boolean;
  /**
   * The variant to use.
   */
  variant?: OverridableStringUnion<PaperVariantDefaults, PaperPropsVariantOverrides>;
}

export type PaperClassKey =
  | 'root'
  | 'rounded'
  | 'outlined'
  | 'elevation'
  | 'elevation0'
  | 'elevation1'
  | 'elevation2'
  | 'elevation3'
  | 'elevation4'
  | 'elevation5'
  | 'elevation6'
  | 'elevation7'
  | 'elevation8'
  | 'elevation9'
  | 'elevation10'
  | 'elevation11'
  | 'elevation12'
  | 'elevation13'
  | 'elevation14'
  | 'elevation15'
  | 'elevation16'
  | 'elevation17'
  | 'elevation18'
  | 'elevation19'
  | 'elevation20'
  | 'elevation21'
  | 'elevation22'
  | 'elevation23'
  | 'elevation24';

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 * - [Paper](https://material-ui.com/components/paper/)
 *
 * API:
 *
 * - [Paper API](https://material-ui.com/api/paper/)
 */
export default function Paper(props: PaperProps): JSX.Element;
