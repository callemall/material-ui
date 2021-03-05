import * as React from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

export default function Variants() {
  return (
    <Box
      sx={{
        display: 'flex',
        // TODO Replace with Stack
        '& > :not(style)': {
          m: 1,
          width: (theme) => theme.spacing(16),
          height: (theme) => theme.spacing(16),
        },
      }}
    >
      <Paper variant="outlined" />
      <Paper variant="outlined" square />
    </Box>
  );
}
