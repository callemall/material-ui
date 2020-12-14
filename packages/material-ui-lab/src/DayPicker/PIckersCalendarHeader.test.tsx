import * as React from 'react';
import { expect } from 'chai';
import PickersCalendarHeader, { PickersCalendarHeaderProps } from './PickersCalendarHeader';

import { createPickerRender } from '../internal/pickers/test-utils'
import { screen } from 'test/utils';
import ClockIcon from '../internal/svg-icons/Clock';

describe('<PickersArrowSwitcher />', () => {
  const render = createPickerRender({ strict: false });

  it('dropDownArrowCustom -> put in a custom component for the drop down arrow', () => {
    render(
      <PickersCalendarHeader
        onMonthChange={() => {}}
        reduceAnimations={false}
        openView={"date"}
        views={["date"]}
        currentMonth={"January"}
        dropDownArrowCustom = {<button>customDropDown</button>}
        //dropDownArrowCustomIcon
      />,
    );

    expect(screen.getByText('customDropDown')).toBeVisible();
  });

  it('dropDownArrowCustomIcon -> put in a custom Icon for the drop down arrow', () => {
    render(
      <PickersCalendarHeader
        onMonthChange={() => {}}
        reduceAnimations={false}
        openView={"date"}
        views={["date"]}
        currentMonth={"January"}
        dropDownArrowCustomIcon = {<ClockIcon data-testid="customIcon"/>}
      />,
    );

    expect(screen.getByTestId('customIcon')).not.to.equal(null);
  });

  it('dropDownArrowCustom and dropDownArrowCustomIcon -> custom component takes precedence over icon swap', () => {
    render(
      <PickersCalendarHeader
        onMonthChange={() => {}}
        reduceAnimations={false}
        openView={"date"}
        views={["date"]}
        currentMonth={"January"}
        dropDownArrowCustom = {<button>customDropDown</button>}
        dropDownArrowCustomIcon = {<ClockIcon data-testid="customIcon"/>}
      />,
    );

    expect(screen.getByText('customDropDown')).toBeVisible();
    expect(screen.getByTestId('customIcon')).to.equal(null);
  });

 

});
