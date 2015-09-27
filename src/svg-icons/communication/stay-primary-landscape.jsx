const React = require('react/addons');
const SvgIcon = require('../../svg-icon');

class CommunicationStayPrimaryLandscape extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return React.addons.shallowCompare(this, nextProps, nextState);
  }

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M1.01 7L1 17c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2H3c-1.1 0-1.99.9-1.99 2zM19 7v10H5V7h14z"/>
      </SvgIcon>
    );
  }
}

module.exports = CommunicationStayPrimaryLandscape;
