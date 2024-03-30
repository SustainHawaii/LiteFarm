import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../../assets/theme';

const useStyles = makeStyles({
  container: {
    marginBottom: '32px',
    display: 'inline-flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    columnGap: '24px',
    rowGap: '16px',
    width:'100%',
    position:'relative',
    marginTop:'1rem',
    flexWrap:'wrap'
  },
});

//TODO storybook
export default function PureCropTileContainer({ children, gap, padding }) {
  const setter = useMediaQuery(theme.breakpoints.up('md'))
  const setter2 = useMediaQuery(theme.breakpoints.up('sm'))
  const setter3 = useMediaQuery(theme.breakpoints.up('xs'))
  const isSmallScreen = useMediaQuery('(max-width:530px)');
  console.log("setter::",setter)
  const classes = useStyles();
  return (
    <div className={classes.container} style={{ columnGap: gap, padding: `0 ${padding}px`,display:'flex',justifyContent:'center',alignItems:'center',flexWrap:'wrap',marginTop:(setter||setter2)?"2rem":isSmallScreen?"10rem":"2.5rem" }} >
      {children}
    </div>
  );
}
