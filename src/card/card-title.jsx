import React, {PropTypes} from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {card} = state.muiTheme;

  return {
    root: {
      padding: 16,
      position: 'relative',
    },
    title: {
      fontSize: 24,
      color: props.titleColor || card.titleColor,
      display: 'block',
      lineHeight: '36px',
    },
    subtitle: {
      fontSize: 14,
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
    },
  };
}

const CardTitle = React.createClass({

  propTypes: {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,

    /**
     * Can be used to render elements inside the Card Title.
     */
    children: PropTypes.node,

    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,

    /**
     * If true, this card component will include a button to expand the card.
     */
    showExpandableButton: PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,

    /**
     * Can be used to render a subtitle in the Card Title.
     */
    subtitle: PropTypes.node,

    /**
     * Override the subtitle color.
     */
    subtitleColor: PropTypes.string,

    /**
     * Override the inline-styles of the subtitle.
     */
    subtitleStyle: PropTypes.object,

    /**
     * Can be used to render a title in the Card Title.
     */
    title: PropTypes.node,

    /**
     * Override the title color.
     */
    titleColor: PropTypes.string,

    /**
     * Override the inline-styles of the title.
     */
    titleStyle: PropTypes.object,
  },

  contextTypes: {
    muiTheme: PropTypes.object,
  },

  childContextTypes: {
    muiTheme: PropTypes.object,
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const rootStyle = Object.assign({}, styles.root, this.props.style);
    const titleStyle = Object.assign({}, styles.title, this.props.titleStyle);
    const subtitleStyle = Object.assign({}, styles.subtitle, this.props.subtitleStyle);

    const {
      title,
      subtitle,
      ...other,
    } = this.props;

    return (
      <div {...other} style={prepareStyles(rootStyle)}>
        <span style={prepareStyles(titleStyle)}>
          {title}
        </span>
        <span style={prepareStyles(subtitleStyle)}>
          {subtitle}
        </span>
        {this.props.children}
      </div>
    );
  },
});

export default CardTitle;
