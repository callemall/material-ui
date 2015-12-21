import React from 'react';
import ReactDOM from 'react-dom';
import StylePropable from './mixins/style-propable';
import muiThemeable from './muiThemeable';

const rowsHeight = 24;

const styles = {
  textarea: {
    width: '100%',
    resize: 'none',
    font: 'inherit',
    padding: 0,
  },
  shadow: {
    width: '100%',
    resize: 'none',
    // Overflow also needed to here to remove the extra row
    // added to textareas in Firefox.
    overflow: 'hidden',
    // Visibility needed to hide the extra text area on ipads
    visibility: 'hidden',
    font: 'inherit',
    padding: 0,
    position: 'absolute',
  },
};

let EnhancedTextarea = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    defaultValue: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    rows: React.PropTypes.number,
    rowsMax: React.PropTypes.number,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
    textareaStyle: React.PropTypes.object,
    value: React.PropTypes.string,
    valueLink: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      rows: 1,
    };
  },

  getInitialState() {
    return {
      height: this.props.rows * rowsHeight,
    };
  },

  componentDidMount() {
    this._syncHeightWithShadow();
  },

  render() {
    let {
      onChange,
      onHeightChange,
      rows,
      style,
      textareaStyle,
      valueLink,
      ...other,
    } = this.props;

    const textareaStyles = this.mergeStyles(styles.textarea, textareaStyle, {
      height: this.state.height,
    });

    const shadowStyles = styles.shadow;

    if (this.props.hasOwnProperty('valueLink')) {
      other.value = this.props.valueLink.value;
    }

    if (this.props.disabled) {
      style.cursor = 'default';
    }

    return (
      <div style={this.prepareStyles(this.props.style)}>
        <textarea
          ref="shadow"
          style={this.prepareStyles(shadowStyles)}
          tabIndex="-1"
          rows={this.props.rows}
          defaultValue={this.props.defaultValue}
          readOnly={true}
          value={this.props.value}
          valueLink={this.props.valueLink} />
        <textarea
          {...other}
          ref="input"
          rows={this.props.rows}
          style={this.prepareStyles(textareaStyles)}
          onChange={this._handleChange} />
      </div>
    );
  },

  getInputNode() {
    return ReactDOM.findDOMNode(this.refs.input);
  },

  setValue(value) {
    this.getInputNode().value = value;
    this._syncHeightWithShadow(value);
  },

  _syncHeightWithShadow(newValue, e) {
    let shadow = ReactDOM.findDOMNode(this.refs.shadow);

    if (newValue !== undefined) {
      shadow.value = newValue;
    }

    let newHeight = shadow.scrollHeight;

    if (this.props.rowsMax >= this.props.rows) {
      newHeight = Math.min(this.props.rowsMax * rowsHeight, newHeight);
    }

    newHeight = Math.max(newHeight, rowsHeight);

    if (this.state.height !== newHeight) {
      this.setState({
        height: newHeight,
      });

      if (this.props.onHeightChange) {
        this.props.onHeightChange(e, newHeight);
      }
    }
  },

  _handleChange(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  },
});

EnhancedTextarea = muiThemeable(EnhancedTextarea, [
  'getInputNode',
  'setValue',
]);

export default EnhancedTextarea;
