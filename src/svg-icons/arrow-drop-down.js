import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../SvgIcon';

let ArrowDropDown = (props) => (
  <SvgIcon {...props}>
    <path d="M7 10l5 5 5-5z"/>
  </SvgIcon>
);
ArrowDropDown = pure(ArrowDropDown);
ArrowDropDown.displayName = 'NavigationArrowDropDown';
ArrowDropDown.muiName = 'SvgIcon';

export default ArrowDropDown;
