// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import PhoneIcon from 'material-ui-icons/Phone';
import FavoriteIcon from 'material-ui-icons/Favorite';
import PersonPinIcon from 'material-ui-icons/PersonPin';
import HelpIcon from 'material-ui-icons/Help';
import ShoppingBasket from 'material-ui-icons/ShoppingBasket';
import ThumbDown from 'material-ui-icons/ThumbDown';
import ThumbUp from 'material-ui-icons/ThumbUp';

const TabContainer = (props) => (
  <div style={{ padding: 20 }}>
    {props.children}
  </div>
);

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styleSheet = createStyleSheet('ScrollableTabsButtonPrevent', (theme) => ({
  root: {
    width: 500,
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },
}));

export default class ScrollableTabsButtonPrevent extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    this.setState({ index });
  }

  render() {
    const classes = this.context.styleManager.render(styleSheet);

    return (
      <Paper className={classes.root}>
        <div className={classes.appBar}>
          <Tabs
            index={this.state.index}
            onChange={this.handleChange}
            scrollable
            scrollButtons={'off'}
          >
            <Tab
              icon={<PhoneIcon />}
            />
            <Tab
              icon={<FavoriteIcon />}
            />
            <Tab
              icon={<PersonPinIcon />}
            />
            <Tab
              icon={<HelpIcon />}
            />
            <Tab
              icon={<ShoppingBasket />}
            />
            <Tab
              icon={<ThumbDown />}
            />
            <Tab
              icon={<ThumbUp />}
            />
          </Tabs>
        </div>
        {this.state.index === 0 && <TabContainer>{'Item One'}</TabContainer>}
        {this.state.index === 1 && <TabContainer>{'Item Two'}</TabContainer>}
        {this.state.index === 2 && <TabContainer>{'Item Three'}</TabContainer>}
        {this.state.index === 3 && <TabContainer>{'Item Four'}</TabContainer>}
        {this.state.index === 4 && <TabContainer>{'Item Five'}</TabContainer>}
        {this.state.index === 5 && <TabContainer>{'Item Six'}</TabContainer>}
        {this.state.index === 6 && <TabContainer>{'Item Seven'}</TabContainer>}
      </Paper>
    );
  }
}
