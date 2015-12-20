import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let TimeDisplay = React.createClass({

  mixins: [StylePropable],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    affix: React.PropTypes.oneOf(['', 'pm', 'am']),
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    onSelectHour: React.PropTypes.func,
    onSelectMin: React.PropTypes.func,
    selectedTime: React.PropTypes.object.isRequired,
  },

  getInitialState() {
    return {
      transitionDirection: 'up',
    };
  },

  getDefaultProps() {
    return {
      mode: 'hour',
      affix: '',
    };
  },

  componentWillReceiveProps(nextProps) {
    let direction;
    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';

      this.setState({
        transitionDirection: direction,
      });
    }
  },

  sanitizeTime() {
    let hour = this.props.selectedTime.getHours();
    let min = this.props.selectedTime.getMinutes().toString();

    if (this.props.format === 'ampm') {
      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if (hour.length < 2 ) hour = '0' + hour;
    if (min.length < 2 ) min = '0' + min;

    return [hour, min];
  },

  getTheme() {
    return this.props._muiTheme.timePicker;
  },

  render() {
    let {
      selectedTime,
      mode,
      ...other,
    } = this.props;

    let styles = {
      root: {
        textAlign: 'center',
        position: 'relative',
        width: 280,
        height: '100%',
      },

      time: {
        margin: '6px 0',
        lineHeight: '58px',
        height: 58,
        fontSize: '58px',
      },

      box: {
        padding: '16px 0',
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        backgroundColor: this.getTheme().headerColor,
        color: this.getTheme().textColor,
      },

      text: {
        color: 'white',
        opacity: 0.7,
      },

      hour: {},

      minute: {},
    };

    let [hour, min] = this.sanitizeTime();

    styles[mode].opacity = 1.0;

    return (
      <div {...other} style={this.prepareStyles(styles.root)}>
        <div style={this.prepareStyles(styles.box)}>
          <div style={this.prepareStyles(styles.time)}>
            <span style={this.prepareStyles(styles.text, styles.hour)} onTouchTap={this.props.onSelectHour}>
              {hour}
            </span>
            <span style={this.prepareStyles(styles.text)}>:</span>
            <span style={this.prepareStyles(styles.text, styles.minute)} onTouchTap={this.props.onSelectMin}>
              {min}
            </span>
          </div>
          <span key={"affix"}>{this.props.affix.toUpperCase()}</span>
        </div>
      </div>
    );
  },

});

TimeDisplay = muiThemeable(TimeDisplay);

export default TimeDisplay;
