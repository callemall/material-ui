const React = require('react');
const BeforeAfterWrapper = require('./before-after-wrapper');


class ClearFix extends React.Component {
  render() {
    let {
      style,
      ...other,
    } = this.props;

    let before = function() {
      return {
        content: "' '",
        display: 'table',
      };
    };

    let after = before();
    after.clear = 'both';

    return (
      <BeforeAfterWrapper
        {...other}
        beforeStyle={before()}
        afterStyle={after}
        style={this.props.style}>
          {this.props.children}
      </BeforeAfterWrapper>
    );
  }
}

module.exports = ClearFix;
