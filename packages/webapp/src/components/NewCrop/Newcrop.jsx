import React, { useState } from 'react';
import './Style.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import InputBase from '@material-ui/core/InputBase';
import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import activefilter from './../../assets/icons/filter/activefilter.png';
import deactivefilter from './../../assets/icons/filter/deactivefilter.png';

const Newcrop = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isactivefilter, setisactivefilter] = useState(false);
  const [activefilterIcon, setisactivefiterIcon] = useState(deactivefilter);
  const [filterTextcolor, setfilterTextcolor] = useState('#9f9f9f');

  const filterHandler = () => {
    setisactivefilter(true);
    setisactivefiterIcon(activefilter);
    setfilterTextcolor('#4bb7c3');
  };
  const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      border: '1px solid gray', // Default border color

      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },

      '&:focus': {
        borderColor: theme.palette.green400, // Change border color on focus
      },

      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '0px',
      color: '#c7c7c7',
      transform: 'scale(1.4)',
    },
    inputRoot: {
      color: 'inherit',
      padding: '0px',
    },
    inputInput: {
      padding: '0px',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      transition: theme.transitions.create(['width', 'border-color']),
      width: '22rem',
      border: '1px solid gray', // Default border color
      fontSize: '16px',
      height: '52px',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      letterSpacing: '1px',
      color: '#000000',
      fontWeight: '300',
      borderRight: '0px',
      [theme.breakpoints.up('md')]: {
        border: '-0.8px #9f9f9f',
        fontSize: '16px',
        height: '52px',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        border: '0px solid #c7c7c7',
        fontsize: '16px',
        letterSpacing: '1px',
        color: '#000000',
        fontWeight: '300',
        borderRight: '0px',
      },
      '&:focus': {
        borderColor: '#4bb7c3', // Change border color on focus
      },
    },
  }));

  const changeBorder = () => {
    if (isInputFocused == true) {
      borderColor: '#4bb7c3';
    }
  };
  const classes = useStyles();

  return (
    <div>
      <div className="col">
        <h1 className="top-heading">CROP</h1>
        <div className="card mb-4 rounded-3 shadow-sm crop-card">
          <div className="card-content">
            <h4 className="my-0 fw-normal">Crop Catalogue</h4>
            <form className="form-inline my-2 my-lg-0 crop-form">
              <div className={classes.search} style={{ width: '41vw' }}>
                <div className={classes.searchIcon}>
                  <SearchOutlinedIcon style={{}} />
                </div>

                <InputBase
                  style={{ color: '#9f9f9f', padding: '0px' }}
                  placeholder="Search Here..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <Button
                variant="contained"
                color="#3ea992"
                size="large"
                className={classes.button}
                onClick={() => {
                  filterHandler();
                }}
                style={{
                  boxShadow: 'none',
                  backgroundColor: '#edf8f9',
                  fontSize: '20px',
                  letterSpacing: '2px',
                  height: '54px',
                  width: '150px',
                }}
              >
                <span style={{ fontSize: '15px', fontweight: 'bold', color: { filterTextcolor } }}>
                  FILTER
                </span>
                <img src={activefilterIcon} alt="Task Logo" className="filter-logo" />
              </Button>
            </form>
          </div>
          <div className="card-body card-content">
            <h3 className="top-heading2">ON YOUR FARM</h3>
            <div className="farm-top-button">
              <div className="rounded  mx-3 my-2 farm-button">0 Active</div>
              <div className="rounded  mx-3 my-2 farm-button">0 Active</div>
              <div className="rounded  mx-3 my-2 farm-button">0 Active</div>
              <div className="rounded  mx-3 my-2 farm-button">0 Active</div>
            </div>
          </div>
          <div className="container ">
            <div className="card mb-4 rounded-3 shadow-sm">
              <div
                className="card-header py-3"
                style={{ height: '100vh', backgroundColor: '#f2f7f7' }}
              >
                <h4 className="top-heading2">Add a new crop</h4>
                <div className="card-body card-content" style={{display:'flex',alignItems:'cemter'}}>
                  <select
                    className="form-select form-select-lg mb-3"
                    aria-label="Large select example"
                  >
                  <div className="container"></div>
                  
                  
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="container ">
                  
                  <div className="form-check form-check-inline mx-3">
                    <input
                      className="form-check-input  check-box"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineCheckbox1">
                      1
                    </label>
                  </div>
                  <div className="form-check form-check-inline mx-3">
                    <input
                      className="form-check-input  check-box"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineCheckbox1">
                      2
                    </label>
                  </div>
                  <div className="form-check form-check-inline mx-3 ">
                    <input
                      className="form-check-input  check-box"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="option1"
                    />
                    <label className="form-check-label" for="inlineCheckbox1">
                      3
                    </label>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newcrop;
