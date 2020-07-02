import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
  additions: {
    MuiButton: {
      dashed: {
        padding: '5px 15px',
        border: "5px dashed red",
        '&$disabled': {
          border: `5px dashed red`,
        },
      },
      tertiery: {
        backgroundColor: 'yellow',
        padding: 20,
      }
    },
  }
});

function styled(BaseComponent, propTypesOverrides) {
  // we are creating here wrapper, but that can be improved
  const Component = React.forwardRef(
  (props, ref) => { const allProps = {...props, ref}; return <BaseComponent {...allProps} /> }
  );

  Component.displayName = BaseComponent.displayName;
  Component.propTypes = { ...(BaseComponent.Naked ? BaseComponent.Naked.propTypes : BaseComponent.propTypes), ...propTypesOverrides}
  return Component;
}

const CustomButton = styled(Button, {
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', 'tertiery']),
});

export default function CustomizedButtons() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
      >
        Custom CSS
      </ColorButton>
      <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.margin}>
          Theme Provider
        </Button>
        <Button variant="dashed" color="primary" className={classes.margin}>
          Dashed Provider
        </Button>
        <CustomButton variant="tertiery">Tertiery button</CustomButton>
      </ThemeProvider>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
      >
        Bootstrap
      </BootstrapButton>
    </div>
  );
}
