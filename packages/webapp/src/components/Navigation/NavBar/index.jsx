import React, { useState } from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PureProfileFloater from '../Floater/ProfileFloater';
import { ReactComponent as NotificationIcon } from '../../../assets/images/notif.svg';
import { ReactComponent as MyFarmIcon } from '../../../assets/images/my-farm.svg';
import { ReactComponent as MyFarmIconSpan } from '../../../assets/images/my-farm-es.svg';
import { ReactComponent as MyFarmIconPort } from '../../../assets/images/my-farm-pt.svg';
import { ReactComponent as MyFarmIconFren } from '../../../assets/images/my-farm-fr.svg';
import { ReactComponent as TaskIcon } from '../../../assets/images/task_icon.svg';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// TODO: use profile picture stored in db
import { ReactComponent as ProfilePicture } from '../../../assets/images/navbar/defaultpfp.svg';
import PureMyFarmFloater from '../Floater/MyFarmFloater';
import { logout } from '../../../util/jwt';
import { useTranslation } from 'react-i18next';
import SmallerLogo from '../../../assets/images/smaller_logo.svg';
import SmallLogo from '../../../assets/images/small_logo.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { BiMenu } from 'react-icons/bi';
import theme, { colors } from '../../../assets/theme';
import { ClickAwayListener, Drawer, SwipeableDrawer, useTheme } from '@material-ui/core';
import SlideMenu from './slideMenu';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch } from 'react-redux';
import { getLanguageFromLocalStorage } from '../../../util/getLanguageFromLocalStorage';
import {
  NavbarSpotlightProvider,
  NavBarNotificationSpotlightProvider,
} from './NavbarSpotlightProvider';
import Alert from '../../../containers/Navigation/Alert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EcoRoundedIcon from '@material-ui/icons/EcoRounded';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import truewealthLogo from '../../../assets/icons/logom8.gif';
import taskLogo from '../../../assets/icons/list-check.png';
import Button from '@material-ui/core/Button';
import myFarmicon2 from '../../../assets/icons/myfarm2.png';
import { style } from 'd3';
import Homepage from '../../../containers/Homecontainer/Homepage';
const useStyles = makeStyles((theme) => ({
  menuButton: {
    position: 'absolute',
    padding: 0,
    left: '24px',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icons: {
    display: 'flex',
    position: 'absolute',
    right: '2rem',
    height: '5rem',
  },
  appBar: {
    background: ' var(--teal100)',
    boxShadow: 'none',
    height: 'var(--global-navbar-height)',
    [theme.breakpoints.up('md')]: {
      '--global-navbar-height': '100px',
    },
  },
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
    fontsize: '1rem',
    transform: ' scale(2)',
  },
  inputRoot: {
    color: 'inherit',
    padding: '0px',
  },
  inputInput: {
    padding: '0px',
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    height: '3rem',
    width: '22rem',
    [theme.breakpoints.up('md')]: {
      // border: '-0.8px #9f9f9f',
      fontSize: '16px',
      height: ' 52px',
      borderradius: ' 8px',
      backgroundcolor: ' #ffffff',
      letterspacing: '1px',
      fontFamily: '"Poppins",sans-sarif',
      color: '#000000',
      fontweight: '200',
      borderright: '0px',

    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexGrow: 1,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
  notificationButton: {
    transform: 'translateY(1px)',
  },
  profileButton: {},
  iconButton: {
    margin: theme.spacing(1),
    padding: 0,
  },
  burgerMenu: {
    fontSize: '55px',
    color: colors.teal700,
    [theme.breakpoints.up('md')]: {
      fontSize: '40px',
    },
  },
  green: {
    color: colors.teal700,
  },
  p: {
    marginBottom: '12px',
  },
  black: {
    color: colors.grey900,
  },
  drawerRoot: {
    zIndex: '1302 !important',
  },
  customBadge: {
    backgroundColor: '#YourDesiredColor',
    color: 'rgb(102, 102, 102)',
  },
}));

export default function PureNavBar({
  showSpotLight,
  showNotification,
  resetSpotlight,
  history,
  setMenuRefresh,
  menuRefresh,
  activeProp,
  showFinances,
  defaultOpenFloater,
  showFarm = true,
  showTasks = true,
  intro = false,
}) {
  const classes = useStyles();
  const { t } = useTranslation([
    'translation',
    'crop',
    'common',
    'disease',
    'task',
    'expense',
    'fertilizer',
    'message',
    'gender',
    'role',
    'crop_nutrients',
    'harvest_uses',
    'soil',
    'certifications',
    'crop_group',
  ]);
  const dispatch = useDispatch();
  //Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeDrawer = () => setIsDrawerOpen(false);
  const burgerMenuOnClick = () => setIsDrawerOpen((prev) => !prev);
  const [manageOpen, setManageOpen] = useState(true);
  const toggleManage = () => {
    setManageOpen(!manageOpen);
  };
  const selectedLanguage = getLanguageFromLocalStorage();

  //Floater
  const [openFloater, setOpenFloater] = useState(defaultOpenFloater);
  const [FARM, NOTIFICATION, PROFILE] = ['farm', 'notification', 'profile'];
  const [menuActive, setMenuActive] = useState(true);
  const isFarmFloaterOpen = openFloater === FARM;
  const isNotificationFloaterOpen = openFloater === NOTIFICATION;
  const isProfileFloaterOpen = openFloater === PROFILE;
  const closeFloater = () => {
    setOpenFloater(null);
  };
  const farmButtonOnClick = () => setOpenFloater(isFarmFloaterOpen ? null : FARM);
  const notificationIconClick = () => {
    closeFloater();
    const url = '/notifications';
    if (history.location.pathname === url)
    {
      // TODO click should update contents; is there better way than full page refresh?
      history.go(0);
    } else
    {
      history.push(url);
    }
  };
  const taskIconClick = () => {
    closeFloater();
    history.push('/tasks');
  };
  const profileButtonOnClick = () => setOpenFloater(isProfileFloaterOpen ? null : PROFILE);
  const onClickAway = () => {
    setOpenFloater(null);
  };

  const farmInfoClick = () => {
    history.push({
      pathname: '/farm',
    });
    closeFloater();
  };
  const farmMapClick = () => {
    history.push({
      pathname: '/map',
    });
    closeFloater();
  };
  const peopleClick = () => {
    history.push({
      pathname: '/people',
    });
    closeFloater();
  };
  const certificationClick = () => {
    history.push('/certification');
    closeFloater();
  };

  //PureProfileFloater
  const helpClick = () => {
    history.push('/help');
    closeFloater();
  };
  const switchFarmClick = () => {
    history.push('/farm_selection');
    closeFloater();
  };
  const logOutClick = () => {
    logout();
    closeFloater();
  };
  const myInfoClick = () => {
    history.push('/profile');
    closeFloater();
  };
  const openTutorialsClick = () => {
    const playlistIDs = {
      es: 'PLDRpVZ4VsXJhghxfEQuApFQTeCWUbGBN9',
      pt: 'PLDRpVZ4VsXJg0ke20m47MmJq6uAJAlAGF',
      en: 'PLDRpVZ4VsXJgVGrmmXJooNqceXvre8IDY',
    };

    const playList = playlistIDs[selectedLanguage] || playlistIDs['en'];
    const url = 'https://www.youtube.com/playlist?list=' + playList;

    const win = window.open(url, '_blank');
    win.focus();
    closeFloater();
  };

  // Pure Notification Floater
  const notificationTeaserClick = () => {
    closeFloater();
  };
  const menuHandler = () => {
    setMenuActive(!menuActive);
    setMenuRefresh(!menuRefresh);

  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing)
    {
      setMobileOpen(!mobileOpen);
    }
  };

  const getLanguageFarmIcon = (language) => {
    switch (language)
    {
      case 'pt':
        return <MyFarmIconPort />;
      case 'es':
        return <MyFarmIconSpan />;
      case 'fr':
        return <MyFarmIconFren />;
      default:
        return <MyFarmIcon />;
    }
  };
  // responsive styles
  const hidder = useMediaQuery(theme.breakpoints.up('xl'));
  const hidder2 = useMediaQuery(theme.breakpoints.up('lg'));
  const hidder3 = useMediaQuery(theme.breakpoints.up('md'));
  const hidder4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hidder5 = useMediaQuery(theme.breakpoints.up('xs'))

  return (
    <AppBar className={classes.appBar} style={{ backgroundColor: 'white', position: 'fixed', height: '15vh' }}>
      <div className='container' style={{ maxHeight: '60px', maxWidth: '100%' }} >
        <nav className='navbar' style={{ justifyContent: 'spaceEvenly', marginTop: '-5px' }}>
          <div className='navmenumain'>
            <ul className='nav_menu_top'>
              <li className='nav_item'>
                <a href='https://truewellth.care' className='nav_link'
                  style={{ backgroundColor: '#42A5F5', borderColor: '#42A5F5' }}>Home</a>
              </li>
              <li className='nav_item'>
                <a href='https://diet.truewellth.care/' className='nav_link'
                  style={{
                    backgroundColor: '#81D4FA',
                    borderColor: '#81D4FA'
                  }}>Diet</a>
              </li>
              <li className='nav_item'>
                <a href='https://myhealth.truewellth.care' className='nav_link'
                  style={{ backgroundColor: '#26A69A', borderColor: '#26A69A' }}>My Health</a>
              </li>
              <li className='nav_item'>
                <a href='https://www.truewellth.market/pages/get-started' className='nav_link'
                  style={{ backgroundColor: '#9CCC65', borderColor: '#9CCC65' }}>Market</a>
              </li>
              <li className='nav_item'>
                <a href='https://grow.truewellth.market/' className='nav_link active_nav'
                  style={{ backgroundColor: '#BDBDBD', borderColor: '#BDBDBD' }}>Farmer</a>
              </li>
              <li className='nav_item'>
                <a href='https://soilmate.truewellth.market/' className='nav_link'
                  style={{ backgroundColor: '#1B5E20', borderColor: '#1B5E20' }}>Soil mate</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <Toolbar className={classes.toolbar}>
        {
          !intro && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={burgerMenuOnClick}
              sx={{ mr: 2, display: { sm: 'none' } }}
              style={{ left: (hidder4 || hidder5) ? '0rem' : "3rem", position: 'absolute', zIndex: '3' }}
            >
              <BiMenu style={{ display: (hidder || hidder2 || hidder3) ? 'none' : "flex", left: '3rem', }} className={classes.burgerMenu} />
            </IconButton>

          )
        }
        <div
          className="container"
          style={{ position: 'absolute', display: 'flex', justifyContent: (!hidder3 || !hidder4 || !hidder5) ? 'center' : (hidder || hidder2) ? 'flex-start' : "flex-start" }}
        >
          <Logo history={history} />
        </div>

        <SwipeableDrawer
          anchor={'left'}
          open={isDrawerOpen}
          classes={{ root: classes.drawerRoot }}
          onClose={() => setIsDrawerOpen(false)}
          onOpen={() => setIsDrawerOpen(true)}
        >
          <SlideMenu
            history={history}
            manageOpen={manageOpen}
            closeDrawer={closeDrawer}
            toggleManage={toggleManage}
            setIsDrawerOpen={setIsDrawerOpen}
            showFinances={showFinances}
          />
        </SwipeableDrawer>
        <div className={classes.search} style={{ border: '1px solid #D8D9DA', display: (hidder || hidder2 || hidder3) ? "inline-block" : "none", marginLeft: "2.5rem" }}>
          <div className={classes.searchIcon}>
            <SearchOutlinedIcon />
          </div>

          <InputBase
            style={{ color: '#9f9f9f', padding: '0px' }}
            placeholder="Search Here..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {!intro && (
          <>
            {showNotification ? (
              <NavBarNotificationSpotlightProvider
                open={showNotification}
                onFinish={resetSpotlight}
              />
            ) : (
              <NavbarSpotlightProvider open={showSpotLight} onFinish={resetSpotlight} />
            )}
          </>
        )}
        <ClickAwayListener onClickAway={onClickAway}>
          <div className={classes.icons}>
            {showTasks && (
              <IconButton
                data-cy="home-taskButton"
                aria-label="notification icon"
                color="primary"
                id="secondStepNavBar"
                onClick={taskIconClick}
                className={classes.iconButton}
                classes={{ root: classes.notificationButton }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={
                    <img src={taskLogo} alt="Task Logo" style={{ height: '20px', width: '20px' }} />
                  }
                  style={{
                    boxShadow: 'none',
                    backgroundColor: '#f5f9f8',
                    color: '#4bb7c3',
                    fontSize: '20px',
                    letterSpacing: '2px',
                    height: '54px',
                    width: '150px',
                    display: (hidder || hidder2) ? "flex" : "none"
                  }}
                >
                  <span style={{ fontSize: '15px', fontweight: 'bold' }}>TASKS</span>
                </Button>
              </IconButton>
            )}
            {!intro && (
              <IconButton
                data-cy="home-notificationButton"
                aria-label="notification icon"
                color="inherit"
                id="zerothStepNavBar"
                onClick={notificationIconClick}
                className={classes.iconButton}
                classes={{ root: classes.notificationButton }}
                style={{ display: (hidder || hidder2) ? "inline-block" : "none" }}
              >
                <div style={{ margin: '0px', padding: '0px' }}>
                  <MenuItem style={{ background: 'transparent', padding: '0px' }}>
                    <IconButton
                      style={{ background: '#ffffff' }}
                    >
                      <span>
                        <Badge
                          badgestyle={{ backgroundColor: '#4bb7c3' }}
                          classes={{ badge: classes.customBadge }}
                        >
                          <NotificationsNoneOutlinedIcon
                            style={{ fontSize: '41px', color: '#4bb7c3' }}
                          />
                        </Badge>
                      </span>
                    </IconButton>
                  </MenuItem>
                </div>
                <Alert />
              </IconButton>
            )}
            {showFarm && (
              <PureMyFarmFloater
                openProfile={isFarmFloaterOpen}
                farmInfoClick={farmInfoClick}
                farmMapClick={farmMapClick}
                peopleClick={peopleClick}
                certificationClick={certificationClick}

              >
                <IconButton
                  data-cy="home-farmButton"
                  aria-label={<EcoRoundedIcon />}
                  color="inherit"
                  // id="firstStepNavBar"
                  className={classes.iconButton}
                  onClick={farmButtonOnClick}
                  style={{ display: (hidder || hidder2) ? "inline-block" : "none" }}

                >
                  <img src={myFarmicon2} />
                </IconButton>
              </PureMyFarmFloater>
            )}

            <PureProfileFloater
              intro={intro}
              openProfile={isProfileFloaterOpen}
              helpClick={helpClick}
              tutorialsClick={openTutorialsClick}
              myInfoClick={myInfoClick}
              logOutClick={logOutClick}
              switchFarmClick={switchFarmClick}
            >
              <IconButton
                data-cy="home-profileButton"
                edge="end"
                aria-label="profile icon"
                color="inherit"
                onClick={profileButtonOnClick}
                id="thirdStepNavBar"
                className={classes.iconButton}
                classes={{ root: classes.profileButton }}
                style={{ background: '#ffffff' }}
              >
                <SupervisedUserCircleIcon
                  style={{
                    color: '#4bb7c3',
                    width: '2.5rem',
                    background: 'transparent',
                    margin: '8px 16px',
                    padding: '0px',
                    fontSize: '41px',
                    display: (!hidder4 || !hidder5) ? "none" :"flex"
                  }}
                />
              </IconButton>
            </PureProfileFloater>
          </div>
        </ClickAwayListener>
      </Toolbar>
    </AppBar>
  );
}

const Logo = ({ history }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('xl'));
  const matches2 = useMediaQuery(theme.breakpoints.up('lg'));
  const matches3 = useMediaQuery(theme.breakpoints.up('md'));
  const matches4 = useMediaQuery(theme.breakpoints.up('sm'));
  const matches5 = useMediaQuery(theme.breakpoints.up('xs'));
  return (
    <img
      src={truewealthLogo}
      style={{ marginLeft: matches ? '-20vw' : matches2 ? "-9vw" : matches3 ? "-4vw" : (matches4 || matches5) ? "0vw" : "26vw", cursor: 'pointer', height: (matches4 || matches5) ? '100px' : "115px", position: 'relative', }}
      alt="Logo"
      onClick={() => history.push('/')}
    />
  );
};


PureNavBar.propTypes = {
  showSpotLight: PropTypes.bool,
  resetSpotlight: PropTypes.func,
  history: PropTypes.object,
  setDefaultDateRange: PropTypes.func,
  showFinances: PropTypes.bool,
  activeProp: PropTypes.bool,
  defaultOpenFloater: PropTypes.oneOf(['farm', 'notification', 'profile']),
};
