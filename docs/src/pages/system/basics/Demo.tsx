import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { alpha } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

export default function Demo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        bgcolor: 'background.paper',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 1,
        fontWeight: 'fontWeightBold',
      }}
    >
      <Img
        sx={{ width: '100%', maxWidth: { xs: 350, md: 250 } }}
        alt=""
        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&dpr=2"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          m: 3,
          minWidth: { md: 350 },
        }}
      >
        <Box component="span" sx={{ fontSize: 16, mt: 1 }}>
          123 Main St, Pheonix AZ
        </Box>
        <Box component="span" sx={{ color: 'primary.main', fontSize: 22 }}>
          $280,000 — $310,000
        </Box>
        <Box
          sx={{
            mt: 1.5,
            p: 0.5,
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            borderRadius: '5px',
            color: 'primary.main',
            fontWeight: 'fontWeightMedium',
            display: 'flex',
            fontSize: 12,
            alignItems: 'center',
            '& svg': {
              fontSize: 21,
              mr: 0.5,
            },
          }}
        >
          <ErrorIcon />
          {'CONFIDENCE SCORE 85%'}
        </Box>
      </Box>
    </Box>
  );
}

interface ImgProps extends BoxProps {
  src?: string;
  alt?: string;
}

function Img(props: ImgProps) {
  return <Box component="img" {...props} />;
}
