// @inheritedComponent Transition

import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import { duration } from '../styles/transitions';
import withTheme from '../styles/withTheme';

const transitionStyles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

/**
 * The Fade transition is used by the Modal component.
 * It's using [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
class Fade extends React.Component {
  handleEntering = node => {
    const { theme, timeout, style = {} } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      delay: style.transitionDelay,
    });
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.enter,
      delay: style.transitionDelay,
    });

    if (this.props.onEntering) {
      this.props.onEntering(node);
    }
  };

  handleExit = node => {
    const { theme, timeout, style = {} } = this.props;
    node.style.transition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      delay: style.transitionDelay,
    });
    node.style.webkitTransition = theme.transitions.create('opacity', {
      duration: typeof timeout === 'number' ? timeout : timeout.exit,
      delay: style.transitionDelay,
    });

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };

  render() {
    const { children, onEntering, onExit, style: styleProp, theme, ...other } = this.props;

    const style = {
      ...styleProp,
      ...(React.isValidElement(children) ? children.props.style : {}),
    };

    return (
      <Transition appear onEntering={this.handleEntering} onExit={this.handleExit} {...other}>
        {(state, childProps) => {
          return React.cloneElement(children, {
            style: {
              opacity: 0,
              ...transitionStyles[state],
              ...style,
            },
            ...childProps,
          });
        }}
      </Transition>
    );
  }
}

Fade.propTypes = {
  /**
   * A single child content element.
   */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * If `true`, the component will transition in.
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * @ignore
   */
  theme: PropTypes.object.isRequired,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({ enter: PropTypes.number, exit: PropTypes.number }),
  ]),
};

Fade.defaultProps = {
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen,
  },
};

export default withTheme()(Fade);
