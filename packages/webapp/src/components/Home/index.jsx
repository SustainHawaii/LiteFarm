import { useMediaQuery } from '@material-ui/core';
import styles from './home.module.scss';
import PropTypes from 'prop-types';
import React from 'react';
import theme from '../../assets/theme';
export default function PureHome({ greeting, first_name, children, imgUrl }) {
  
  const hidder = useMediaQuery(theme.breakpoints.up('xl'));
  const hidder2 = useMediaQuery(theme.breakpoints.up('lg'));
  const hidder3 = useMediaQuery(theme.breakpoints.up('md'));
  const hidder4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hidder5 = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <>
<div className={styles.container} style={{ backgroundImage: `url("${imgUrl}")` ,width:(hidder||hidder2||hidder3)?'90vw':"70vw",position:'relative',top:'0rem',height:'100vh',left:(hidder||hidder2||hidder3)?"20vw":"0vw",display:'flex',justifyContent:"center",alignItems:'center',flexDirection:"column"  }}>
      <h3 className={styles.title}>
        {greeting}
        <br />
        {first_name}
      </h3>
      {children}
    </div>
    </>
    
  );
}

PureHome.prototype = {
  greeting: PropTypes.string,
  first_name: PropTypes.string,
  onClick: PropTypes.func,
};
