import * as React from 'react';
import { loadCSS } from 'fg-loadcss';
import Box from '@material-ui/core/Box';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

export default function FontAwesomeIcon() {
  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.14.0/css/all.css',
      // Inject before JSS
      document.querySelector('#font-awesome-css') || document.head.firstChild,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);

  return (
    <Box
      sx={{
        '& > *': {
          m: 2,
        },
      }}
    >
      <Icon baseClassName="fas" className="fa-plus-circle" />
      <Icon baseClassName="fas" className="fa-plus-circle" color="primary" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        style={{ color: green[500] }}
      />
      <Icon baseClassName="fas" className="fa-plus-circle" fontSize="small" />
      <Icon
        baseClassName="fas"
        className="fa-plus-circle"
        style={{ fontSize: 30 }}
      />
    </Box>
  );
}
