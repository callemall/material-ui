import * as React from 'react';
import { MemoryRouter as Router } from 'react-router';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />;
});

const theme = createMuiTheme({
  components: {
    MuiLink: {
      defaultProps: {
        // @ts-ignore
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default function LinkRouterWithTheme() {
  return (
    <Box
      sx={{
        display: 'flex',
        typography: 'body1',
        flexDirection: 'column',
        alignItems: 'center', // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 1 },
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Link href="/">Link</Link>
          <Button href="/" variant="contained">
            Link
          </Button>
        </Router>
      </ThemeProvider>
    </Box>
  );
}
