import React from 'react';
import styles from './assets/weatherBoard.module.scss';
import PropTypes from 'prop-types';
import WeatherIcon from './WeatherIcon';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../assets/theme';

/**
 * TooShort UI component for user interaction
 */


export default function PureWeatherBoard({ city, date, temperature, iconName, wind, humidity }) {
  const hidder = useMediaQuery(theme.breakpoints.up('xl'))
const hidder2 = useMediaQuery(theme.breakpoints.up('lg'));
const hidder3 = useMediaQuery(theme.breakpoints.up('md'));
const hidder4 = useMediaQuery(theme.breakpoints.up('sm'))
const hidder5 = useMediaQuery(theme.breakpoints.up('xs'))
  return (
    <div className={styles.container} style={{top:'-4rem',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <div className={styles.city}>{city}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.temperature}>{temperature}</div>
      <div className={styles.icon}>
        <WeatherIcon name={iconName} />
      </div>
      <div className={styles.wind}>{wind}</div>
      <div className={styles.humidity}>{humidity}</div>
    </div>
  );
}

PureWeatherBoard.propTypes = {
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  temperature: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  wind: PropTypes.string.isRequired,
  humidity: PropTypes.string.isRequired,
};
