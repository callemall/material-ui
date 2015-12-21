import {Component, PropTypes} from 'react';

class MuiThemeProvider extends Component {

  static propTypes = {
    children: PropTypes.element,
    muiTheme: PropTypes.object,
  };

  static childContextTypes = {
    _muiTheme: PropTypes.object,
  };

  getChildContext() {
    return {
      _muiTheme: this.props.muiTheme,
    };
  }

  render() {
    return this.props.children;
  }
}

export default MuiThemeProvider;
