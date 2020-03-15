import * as React from 'react';
import { StandardProps, ModalManager } from '..';
import { BackdropProps } from '../Backdrop';
import { PortalProps } from '../Portal';

export interface ModalProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, never, 'children'> {
  BackdropComponent?: React.ElementType<BackdropProps>;
  BackdropProps?: Partial<BackdropProps>;
  children: React.ReactElement;
  closeAfterTransition?: boolean;
  container?: PortalProps['container'];
  disableAutoFocus?: boolean;
  disableBackdropClick?: boolean;
  disableEnforceFocus?: boolean;
  disableEscapeKeyDown?: boolean;
  disablePortal?: PortalProps['disablePortal'];
  disableRestoreFocus?: boolean;
  disableScrollLock?: boolean;
  hideBackdrop?: boolean;
  keepMounted?: boolean;
  manager?: ModalManager;
  onBackdropClick?: React.ReactEventHandler<{}>;
  onClose?: {
    bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
  }['bivarianceHack'];
  onEscapeKeyDown?: React.ReactEventHandler<{}>;
  onRendered?: PortalProps['onRendered'];
  open: boolean;
}

/**
 * Modal is a lower-level construct that is leveraged by the following components:
 *
 * - [Dialog](/api/dialog/)
 * - [Drawer](/api/drawer/)
 * - [Menu](/api/menu/)
 * - [Popover](/api/popover/)
 *
 * If you are creating a modal dialog, you probably want to use the [Dialog](/api/dialog/) component
 * rather than directly using Modal.
 *
 * This component shares many concepts with [react-overlays](https://react-bootstrap.github.io/react-overlays/#modals).
 *
 * Demos:
 * - {@link https://material-ui.com/components/modal/ Modal}
 *
 * API:
 * - {@link https://material-ui.com/api/Modal Modal API}
 *
 */
declare const Modal: React.ComponentType<ModalProps>;

export default Modal;
