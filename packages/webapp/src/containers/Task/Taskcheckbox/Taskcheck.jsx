import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Taskcheck = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              onChange={handleChange}
              color="#000"
              style={{
                color: '#4bc7c3',
                transform: 'scale(1.5)',
              }}
              inputProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
            />
          }
          label="Yes, set hourly wage"
          style={{ color: '#000' }}
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="#000"
              style={{
                color: '#4bc7c3',
                borderColor: '#000',
                transform: 'scale(1.5)',
              }}
              inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
            />
          }
          style={{ color: '#000' }}
          label="Yes, just for this task"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="#000"
              style={{
                color: '#4bc7c3',
                borderColor: '#000',
                transform: 'scale(1.5)',
              }}
              inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
            />
          }
          style={{ color: '#000' }}
          label="No"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              style={{
                color: '#4bc7c3',
                borderColor: '#000',
                transform: 'scale(1.5)',
              }}
              inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
            />
          }
          style={{ color: '#000' }}
          label="No, do not ask again for this employee"
        />
      </FormGroup>
    </>
  );
};

export default Taskcheck;
