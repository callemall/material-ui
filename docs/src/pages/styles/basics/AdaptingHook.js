import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: props =>
      `linear-gradient(45deg, ${props.color === 'red' ?
        '#FE6B8B 30%, #FF8E53' : '#2196F3 30%, #21CBF3'} 90%)`,
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      `0 3px 5px 2px rgba(${props.color === 'red' ?
      '255, 105, 135, .3' : '33, 203, 243, .3'})`,
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 8,
  },
});

function MyButton(props) {
  const { color, ...other } = props;
  const classes = useStyles(props);
  return <Button className={classes.root} {...other} />;
}

MyButton.propTypes = {
  color: PropTypes.string.isRequired,
};

function AdaptingHook() {
  return (
    <React.Fragment>
      <MyButton color="red">Red</MyButton>
      <MyButton color="blue">Blue</MyButton>
    </React.Fragment>
  );
}

export default AdaptingHook;
