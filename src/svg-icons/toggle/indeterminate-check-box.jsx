const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class ToggleIndeterminateCheckBox extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <defs><path id="a" d="M0 0h24v24H0z"/></defs><clipPath id="b"><use  overflow="visible"/></clipPath><path clip-path="url(#b)" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
      </SvgIcon>
    );
  }
}

module.exports = ToggleIndeterminateCheckBox;
