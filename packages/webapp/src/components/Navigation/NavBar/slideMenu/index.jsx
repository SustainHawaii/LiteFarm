import React from 'react';
import { ReactComponent as Logo } from '../../../../assets/images/navbar/nav-logo.svg';
import { ReactComponent as VectorUp } from '../../../../assets/images/navbar/vector-up.svg';
import { ReactComponent as VectorDown } from '../../../../assets/images/navbar/vector-down.svg';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, useMediaQuery } from '@material-ui/core';
import { isAdminSelector } from '../../../../containers/userFarmSlice';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Sidemenu from '../../../Widthcontainer/mainSidebar/Sidemenu';
import truewealthLogo from '../../../../assets/icons/logom8.gif';
import theme from '../../../../assets/theme';



const useStyles = makeStyles((theme) => ({
  container: {
    width:(theme.breakpoints.up('sm')||theme.breakpoints.up('xs'))?"65vw":!theme.breakpoints.up('xs')?"55vw":'40vw' ,
    height: "100%"
  },
  logo: {
    margin: '16px 0 32px 24px',
    cursor: 'pointer',
  },
  listItem: {
    paddingLeft: theme.spacing(3),
  },
  ListItemText: {
    fontSize: '16px',
  },
  subListItem: {
    paddingLeft: theme.spacing(7),
  },
  subListItemText: {
    fontSize: '14px',
  },
}));

function SlideMenu({ history, manageOpen, closeDrawer, toggleManage, showFinances, menuActive }) {
  const { t } = useTranslation();
  const classes = useStyles();
  const handleClick = (link) => {
    history.push(link);
    closeDrawer();
  };

  const isAdmin = useSelector(isAdminSelector);
  return (
    <div role='presentation' className={classes.container}>
      <div className="container bg-light">
        <img
          src={truewealthLogo}
          style={{ cursor: 'pointer', height: '115px', width: '100%', position: 'relative', }}
          alt="Logo"
          onClick={() => history.push('/')}
        />
      </div>
      <Sidemenu />

    </div>
  );
}

export default SlideMenu;

SlideMenu.prototype = {
  history: PropTypes.object,
  manageOpen: PropTypes.bool,
  closeDrawer: PropTypes.func,
  toggleManage: PropTypes.func,
  setDefaultDateRange: PropTypes.func,
  showFinances: PropTypes.bool,
};
