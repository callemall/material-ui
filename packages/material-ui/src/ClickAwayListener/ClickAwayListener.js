// @inheritedComponent EventListener

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import ownerDocument from '../utils/ownerDocument';
import { useForkRef } from '../utils/reactHelpers';

function useMountedRef() {
  const mountedRef = React.useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
}

/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 */
function ClickAwayListener(props) {
  const { children, mouseEvent, touchEvent, onClickAway, ...other } = props;
  const mountedRef = useMountedRef();
  const movedRef = React.useRef(false);

  const nodeRef = React.useRef();
  const handleRef = useForkRef(children.ref, ref => {
    nodeRef.current = ReactDOM.findDOMNode(ref);
  });

  function handleClickAway(event) {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE 11 support, which trigger the handleClickAway even after the unbind
    if (!mountedRef.current) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    const { current: node } = nodeRef;
    // The child might render null.
    if (!node) {
      return;
    }

    const doc = ownerDocument(node);

    if (
      doc.documentElement &&
      doc.documentElement.contains(event.target) &&
      !node.contains(event.target)
    ) {
      onClickAway(event);
    }
  }

  function handleTouchMove() {
    movedRef.current = true;
  }

  const listenerProps = {};
  if (mouseEvent !== false) {
    listenerProps[mouseEvent] = handleClickAway;
  }
  if (touchEvent !== false) {
    listenerProps[touchEvent] = handleClickAway;
    listenerProps.onTouchMove = handleTouchMove;
  }

  return (
    <React.Fragment>
      {React.cloneElement(children, { ref: handleRef })}
      <EventListener target="document" {...listenerProps} {...other} />
    </React.Fragment>
  );
}

ClickAwayListener.propTypes = {
  /**
   * The wrapped element.
   */
  children: PropTypes.element.isRequired,
  /**
   * The mouse event to listen to. You can disable the listener by providing `false`.
   */
  mouseEvent: PropTypes.oneOf(['onClick', 'onMouseDown', 'onMouseUp', false]),
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: PropTypes.func.isRequired,
  /**
   * The touch event to listen to. You can disable the listener by providing `false`.
   */
  touchEvent: PropTypes.oneOf(['onTouchStart', 'onTouchEnd', false]),
};

ClickAwayListener.defaultProps = {
  mouseEvent: 'onMouseUp',
  touchEvent: 'onTouchEnd',
};

export default ClickAwayListener;
