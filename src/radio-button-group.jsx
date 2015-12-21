import React from 'react';
import RadioButton from './radio-button';
import StylePropable from './mixins/style-propable';
import muiThemeable from './muiThemeable';

let RadioButtonGroup = React.createClass({
  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    children: React.PropTypes.node,

    /**
     * The css class name of the root element.
     */
    className: React.PropTypes.string,
    defaultSelected: React.PropTypes.string,
    labelPosition: React.PropTypes.oneOf(['left', 'right']),
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    valueSelected: React.PropTypes.string,
  },

  _hasCheckAttribute(radioButton) {
    return radioButton.props.hasOwnProperty('checked') &&
      radioButton.props.checked;
  },

  getInitialState() {
    return {
      numberCheckedRadioButtons: 0,
      selected: this.props.valueSelected || this.props.defaultSelected || '',
    };
  },

  getDefaultProps() {
    return {
      style: {},
    };
  },

  componentWillMount() {
    let cnt = 0;

    React.Children.forEach(this.props.children, (option) => {
      if (this._hasCheckAttribute(option)) cnt++;
    }, this);

    this.setState({numberCheckedRadioButtons: cnt});
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('valueSelected')) {
      this.setState({selected: nextProps.valueSelected});
    }
  },

  render() {
    let options = React.Children.map(this.props.children, (option) => {
      let {
        name,
        value,
        label,
        onCheck,
        ...other,
      } = option.props;

      return (
        <RadioButton
          {...other}
          ref={option.props.value}
          name={this.props.name}
          key={option.props.value}
          value={option.props.value}
          label={option.props.label}
          labelPosition={this.props.labelPosition}
          onCheck={this._onChange}
          checked={option.props.value === this.state.selected}
        />
      );
    }, this);

    return (
      <div
        style={this.prepareStyles(this.props.style)}
        className={this.props.className || ''}>
        {options}
      </div>
    );
  },

  _updateRadioButtons(newSelection) {
    if (this.state.numberCheckedRadioButtons === 0) {
      this.setState({selected: newSelection});
    }
    else if (process.env.NODE_ENV !== 'production') {
      let message = 'Cannot select a different radio button while another radio button ' +
                    "has the 'checked' property set to true.";
      console.error(message);
    }
  },

  _onChange(e, newSelection) {
    this._updateRadioButtons(newSelection);

    // Successful update
    if (this.state.numberCheckedRadioButtons === 0) {
      if (this.props.onChange) this.props.onChange(e, newSelection);
    }
  },

  getSelectedValue() {
    return this.state.selected;
  },

  setSelectedValue(newSelectionValue) {
    this._updateRadioButtons(newSelectionValue);
  },

  clearValue() {
    this.setSelectedValue('');
  },

});

RadioButtonGroup = muiThemeable(RadioButtonGroup, [
  'getSelectedValue',
  'setSelectedValue',
  'clearValue',
]);

export default RadioButtonGroup;
