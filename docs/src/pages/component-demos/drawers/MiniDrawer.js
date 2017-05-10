// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

const drawerWidth = 250;

const styleSheet = createStyleSheet('MiniDrawer', (theme) => ({
  demoFrame: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 32,
    zIndex: 1,
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.navDrawer,
    transition: theme.transitions.create(['width', 'margin'],
                { duration: theme.transitions.duration.shorter }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: 'auto',
    width: drawerWidth, // Required to make the transition work.
  },
  drawerInner: {
    width: drawerWidth, // Makes the items inside not wrap.
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 64,
    padding: '0 8px',
  },
  navItem: {
    paddingLeft: 24,
  },
  navItemText: {
    padding: '0 16px',
  },
}));

class MiniDrawer extends Component {
  state = {
    open: false,
  };

  toggleDrawer = (open) => {
    this.setState({ open });
  };

  handleDrawerOpen = () => this.toggleDrawer(true);
  handleDrawerClose = () => this.toggleDrawer(false);

  render() {
    const classes = this.props.classes;

    const mailFolderListItems = (
      <div>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Inbox
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Starred
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Send mail
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Drafts
          </Typography>
        </ListItem>
      </div>
    );

    const otherMailFolderListItems = (
      <div>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            All mail
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Trash
          </Typography>
        </ListItem>
        <ListItem button className={classes.navItem}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <Typography type="body2" className={classes.navItemText}>
            Spam
          </Typography>
        </ListItem>
      </div>
    );

    return (
      <div className={classes.demoFrame}>
        <Drawer
          type="mini"
          paperClassName={classes.drawerPaper}
          open={this.state.open}
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <List className={classes.list}>
              {mailFolderListItems}
            </List>
            <Divider />
            <List className={classes.list}>
              {otherMailFolderListItems}
            </List>
          </div>
        </Drawer>
        <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
              contrast
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" colorInherit noWrap>
              Mini variant navigation drawer
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(MiniDrawer);
