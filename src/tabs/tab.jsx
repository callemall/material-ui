let React = require('react');
let StylePropable = require('../mixins/style-propable');


let Tab = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    onClick: React.PropTypes.func,
    label: React.PropTypes.string,
    onActive: React.PropTypes.func,
    selected: React.PropTypes.bool,
    width: React.PropTypes.string,
    value: React.PropTypes.string,
  },

  getDefaultProps(){
    return {
      onActive: () => {},
      onClick: () => {},
    };
  },

  render() {
    let {
      label,
      onActive,
      onClick,
      selected,
      style,
      value,
      width,
      ...other,
    } = this.props;
    let styles = this.mergeAndPrefix({
      display: 'table-cell',
      cursor: 'pointer',
      textAlign: 'center',
      verticalAlign: 'middle',
      height: 48,
      color: selected ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)',
      outline: 'none',
      fontSize: 14,
      fontWeight: 500,
      whiteSpace: 'initial',
      fontFamily: this.context.muiTheme.contentFontFamily,
      boxSizing: 'border-box',
      width: width,
    }, style);

    return (
      <div
        {...other}
        style={styles}
        onClick={this._handleClick}>
        {label}
      </div>
    );
  },

   _handleClick(e) {
    this.props.onClick(this.props.value, e, this);
  },

});

module.exports = Tab;
