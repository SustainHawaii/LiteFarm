import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Card from '../../Card';
import { useTranslation } from 'react-i18next';
import Square from '../../Square';
import { getDateInputFormat } from '../../../util/moment';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    padding: '12px',
    position: 'relative',
    flexDirection: 'column',
    rowGap: '16px',
    background: 'white',
    justifyContent: 'center',
    flexWrap: 'wrap',
    border: 'none',
  },
  secondRowContainer: {
    display: 'flex',
    gap: '5px',
    height: '3rem',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  thirdContainer: {
    minWidth: '95px',
    height: '53px',
    borderRadius: '8px',
    backgroundColor: '#f2f7f7',
    margin: '0px 5px 10px',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: '#4bb7c3',
    border: '1px solid #ccc',
    width: '12rem',
    cursor: 'pointer',
    padding: '5px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '1px 1px 11px 4px rgb(210 208 208 / 70%)',
    transition: 'border-color 0.3s ease',
    '&:hover': {
      borderColor: '#4bc7c3',
      background: 'white',
    },
  },
  activethirdContainer: {
    minWidth: '95px',
    height: '53px',
    borderRadius: '8px',
    backgroundColor: '#4bb7c3',
    margin: '0px 5px 10px',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: '#fff',
    border: '1px solid #ccc',
    width: '12rem',
    cursor: 'pointer',
    padding: '5px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '1px 1px 11px 4px rgb(210 208 208 / 70%)',
    transition: 'border-color 0.3s ease',
  },
  cropCountContainer: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  Squarecolor: {
    color: '#4bb7c3',
  },
  activeBadge: {
    background: '#037A0F',
    color: 'white',
    height: '1.5rem',
    marginRight: '3.5rem',
    width: '2rem',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
  plannedBadge: {
    background: '#AA5F04',
    color: 'white',
    height: '1.5rem',
    width: '2rem',
    marginRight: '2.5rem',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
  needplanBadge: {
    background: '#D02620',
    color: 'white',
    height: '1.5rem',
    marginRight: '1.5rem',
    width: '2rem',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
  pastBadge: {
    background: '#085d50',
    color: 'white',
    height: '1.5rem',
    width: '2rem',
    marginRight: '4.5rem',
    fontWeight: 'bold',
    borderRadius: '4px',
  },
}));

export default function CropStatusInfoBox({
  status,
  date = getDateInputFormat(new Date()),
  setDate,
  setActive,
  setNeedplan,
  setPlanned,
  setPast,
  activecard,
  plannedcard,
  pastcard,
  needplancard,
  ...props
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const onDateChange = (e) => setDate?.(e.target.value);

  const handleActive = () => {
    setActive(true);
    setPlanned(false);
    setNeedplan(false);
    setPast(false);
  };
  const handlePast = () => {
    setPast(true);
    setActive(false);
    setPlanned(false);
    setNeedplan(false);
  };
  const handlePlanned = () => {
    setPlanned(true);
    setPast(false);
    setActive(false);
    setNeedplan(false);
  };
  const handleNeedplan = () => {
    setNeedplan(true);
    setPlanned(false);
    setPast(false);
    setActive(false);
  };
  return (
    <Card color={'info'} className={clsx(classes.container)} {...props}>
      {status && (
        <div className={classes.secondRowContainer}>
          <div className={classes.cropCountContainer}>
            <div
              className={clsx(
                classes.thirdContainer,
                needplancard ? classes.activethirdContainer : null
              )}
              onClick={handleNeedplan}
            >
              <Square className={classes.needplanBadge}>{status.noPlans}</Square>
              <span style={{position:'relative',left:'0rem'}}>
              {t('common:NEEDS_PLAN')}
              </span>
            </div>
          </div>
          <div className={classes.cropCountContainer}>
            <div
              className={clsx(
                classes.thirdContainer,
                plannedcard ? classes.activethirdContainer : null
              )}
              onClick={handlePlanned}
            >
              <Square className={classes.plannedBadge}>{status.planned}</Square>
              <span style={{position:'relative',left:'-1rem'}}>
              {t('common:PLANNED')}

              </span>
            </div>
          </div>
          <div className={classes.cropCountContainer}>
            <div
              className={clsx(
                classes.thirdContainer,
                pastcard ? classes.activethirdContainer : null
              )}
              onClick={handlePast}
            >
              <Square className={classes.pastBadge}>{status.completed + status.abandoned}</Square>
              <span>
              <span style={{position:'relative',left:'-3rem'}}>
              {t('common:PAST')}
              </span>
              </span>
            </div>
          </div>
          <div className={classes.cropCountContainer}>
            <div
              className={clsx(
                classes.thirdContainer,
                activecard ? classes.activethirdContainer : null
              )}
              onClick={handleActive}
            >
              <Square className={classes.activeBadge}>{status.active}</Square>
              <span style={{position:'relative',left:'-2rem'}}>
              {t('common:ACTIVE')}
              </span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

CropStatusInfoBox.propTypes = {
  setDate: PropTypes.func,
  date: PropTypes.string,
  activecard: PropTypes.bool,
  pastcard: PropTypes.bool,
  plannedcard: PropTypes.bool,
  needplancard: PropTypes.bool,
  status: PropTypes.exact({
    active: PropTypes.number,
    abandoned: PropTypes.number,
    planned: PropTypes.number,
    completed: PropTypes.number,
    noPlans: PropTypes.number,
  }),
};
