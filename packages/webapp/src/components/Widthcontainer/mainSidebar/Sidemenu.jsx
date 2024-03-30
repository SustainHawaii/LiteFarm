import React, { useState } from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import EcoIcon from '@material-ui/icons/Eco';
import { useTranslation } from 'react-i18next';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { isAdminSelector } from '../../../containers/userFarmSlice';
import './Style.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import manageIcon from '../../../assets/icons/manage.png';
import financeIcon1 from '../../../assets/icons/finance.png';
import financeIcon2 from '../../../assets/icons/finance2.png';
import Insights from '../../../assets/icons/insights.png';
import myFarmicon1 from '../../../assets/icons/myfarm.png';
import myFarmicon2 from '../../../assets/icons/myfarm2.png';
import { FaSmile } from 'react-icons/fa';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../../assets/theme';

const Sidemenu = ({
  history,
  manageOpen,
  closeDrawer,
  toggleManage,
  showFinances,
  setDisplayCrop,
  setdisplayDocument,
  setdisplayFinance,
  setDisplayInsights,
  setmainShower,
  isDrawerActivation,
}) => {
  const [Arrow, setArrow] = useState(false);
  const toggleArrow = () => {
    setArrow(!Arrow);
  };
  const [activeBar, setactiveBar] = useState(false);
  const { t } = useTranslation();
  const handleClick = (link) => {
    history.push(link);
    closeDrawer();
  };

  const [Finaceoption, setFinanceoption] = useState(false);
  const [Insightoption, setInsightoption] = useState(false);
  const [Myfarmoption, setMyfarmoption] = useState(false);
  const [ManageOption, setManageOption] = useState(false);
  const [CropOption, setCropOption] = useState(false);
  const [TaskOption, setTaskOption] = useState(false);
  const [ProductOption, setProductOption] = useState(false);
  const [ServiceOption, setServiceOption] = useState(false);
  const [DocumentOption, setDocmentOption] = useState(false);
  const cropOptionhandler = () => {
    setManageOption(true);
    setCropOption(true);
    setTaskOption(false);
    setProductOption(false);
    setServiceOption(false);
    setDocmentOption(false);
  };
  const TaskOptionhandler = () => {
    setManageOption(true);
    setTaskOption(true);
    setCropOption(false);
    setProductOption(false);
    setServiceOption(false);
    setDocmentOption(false);
  };
  const ProdutOptionhandler = () => {
    setManageOption(true);
    setProductOption(true);
    setTaskOption(false);
    setCropOption(false);
    setServiceOption(false);
    setDocmentOption(false);
  };
  const ServiceOptionhandler = () => {
    setManageOption(true);
    setServiceOption(true);
    setProductOption(false);
    setTaskOption(false);
    setCropOption(false);
    setDocmentOption(false);
  };
  const DocumentOptionhandler = () => {
    setManageOption(true);
    setDocmentOption(true);
    setProductOption(false);
    setTaskOption(false);
    setCropOption(false);
    setServiceOption(false);
  };

  const FinanceBar = () => {
    setactiveBar(true);
    setFinanceoption(true);
    setInsightoption(false);
    setMyfarmoption(false);
  };
  const InsightBar = () => {
    setactiveBar(true);
    setInsightoption(true);
    setFinanceoption(false);
    setMyfarmoption(false);
  };
  const MyfarmBar = () => {
    setactiveBar(true);
    setMyfarmoption(true);
    setFinanceoption(false);
    setInsightoption(false);
  };

  const renderCrop = () => {
    setDisplayCrop(true);
    setmainShower(true);
    setdisplayDocument(false);
    setdisplayFinance(false);
    setDisplayInsights(false);
  };
  const renderDocument = () => {
    setdisplayDocument(true);
    setmainShower(true);
    setDisplayCrop(false);
    setdisplayFinance(false);
    setDisplayInsights(false);
  };
  const renderFinance = () => {
    setdisplayFinance(true);
    setmainShower(true);
    setDisplayCrop(false);
    setdisplayDocument(false);
    setDisplayInsights(false);
  };
  const renderInsights = () => {
    setDisplayInsights(true);
    setmainShower(true);
    setDisplayCrop(false);
    setdisplayDocument(false);
    setdisplayFinance(false);
  };
  const checkActiveManage = () => {
    if (
      ManageOption ||
      CropOption ||
      TaskOption ||
      ProductOption ||
      ServiceOption ||
      (DocumentOption == true && Finaceoption) ||
      Insightoption ||
      Myfarmoption == true
    )
    {
      setManageOption(false);
      setCropOption(false);
      setTaskOption(false);
      setProductOption(false);
      setServiceOption(false);
      setDocmentOption(false);
    }
  };
  const checkOuterOption = () => {
    if (
      Finaceoption ||
      Insightoption ||
      (Myfarmoption == true && ManageOption) ||
      CropOption ||
      TaskOption ||
      ProductOption ||
      ServiceOption ||
      DocumentOption == true
    )
    {
      setFinanceoption(false);
      setInsightoption(false);
      setMyfarmoption(false);
    }
    if (CropOption == true)
    {
      setTaskOption(false);
      setProductOption(false);
      setServiceOption(false);
      setDocmentOption(false);
    } else if (TaskOption == true)
    {
      setCropOption(false);
      setProductOption(false);
      setServiceOption(false);
      setDocmentOption(false);
    } else if (ProductOption == true)
    {
      setCropOption(false);
      setServiceOption(false);
      setDocmentOption(false);
      setTaskOption(false);
    } else if (ServiceOption == true)
    {
      setCropOption(false);
      setProductOption(false);
      setDocmentOption(false);
      setTaskOption(false);
    } else if (DocumentOption == true)
    {
      setCropOption(false);
      setProductOption(false);
      setTaskOption(false);
      setServiceOption(false);
    }
  };
  // const hidder = useMediaQuery(theme.breakpoints.up('xl'));
  const hidder = useMediaQuery(theme.breakpoints.up('xl'));
  const hidder2 = useMediaQuery(theme.breakpoints.up('lg'));
  const hidder3 = useMediaQuery(theme.breakpoints.up('md'));
  const hidder4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hidder5 = useMediaQuery(theme.breakpoints.up('xs'))
  const matchesSide = useMediaQuery('(min-width:770px)');
  const isAdmin = useSelector(isAdminSelector);
  return (
    <div>
      <div
        className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto"
        style={{
          display: "contents",
          position: 'fixed',
          width:"25vw",
          height: '100%',
          left: '0px',
          top: (!hidder3)?"18vw":'10vw',
          marginRight:'2.5rem',
        zIndex:'1'
        }}
      >
        <div className="flex-shrink-0 p-3" style={{ width:!hidder3? '40vw':"20vw" }}>
          <ul className="list-unstyled ps-0">
            <li className="mb-0">
              <button
                className="btn  d-inline-flex fontweight align-items-center rounded  collapsed "
                data-bs-toggle="collapse"
                style={{ color: '#666666', width: '23rem', height: '5rem', marginLeft: '-2px' }}
                data-bs-target="#home-collapse"
                aria-expanded="true"
                onClick={() => {
                  toggleArrow();
                  toggleManage();
                  checkOuterOption();
                }}
                id="list"
              >
                {ManageOption ? (
                  <div className="active-bar fontweight"></div>
                ) : (
                  <div className="active-bar fontweight toggleDisplay"></div>
                )}
                <img
                  src={manageIcon}
                  style={
                    ManageOption
                      ? {
                        color: '#4bb7c3',
                        marginLeft: '0px',
                        marginRight: '5px',
                        position: 'relative',
                        left: '0px',
                      }
                      : {
                        color: '#9f9f9f',
                        marginLeft: '0px',
                        marginRight: '2px',
                        position: 'relative',
                        left: '0px',
                      }
                  }
                />
                <span
                  style={
                    ManageOption
                      ? {
                        color: '#4bb7c3',
                        position: 'absolute',
                        left: '74px',
                        fontFamily: 'Poppins',
                      }
                      : {
                        color: '#666666',
                        position: 'absolute',
                        left: '74px',
                        fontFamily: 'Poppins',
                      }
                  }
                >
                  MANAGE
                </span>
                {Arrow ? (
                  <ExpandMoreIcon style={{ position: 'absolute', right: '2rem' }} />
                ) : (
                  <ExpandLessIcon style={{ position: 'absolute', right: '2rem' }} />
                )}
              </button>
              {manageOpen || (
                <>
                  <div
                    className="collapse show"
                    id="home-collapse"
                    style={{ left: '2rem', position: 'relative' }}
                  >
                    <ul className="list-unstyled" style={{ width: '18rem' }}>
                      <li
                        id="list"
                      >
                        <button
                          onClick={() => {
                            cropOptionhandler();
                            renderCrop();
                            checkOuterOption();
                          }}
                          className="mybutton"
                        >
                          <a
                            className="dropdown-item d-flex list-text align-items-center gap-2 py-2"
                            href="/crop_catalogue"
                            style={{
                              ...(CropOption
                                ? { color: '#4bb7c3', fontFamily: 'Poppins' }
                                : { color: '#9f9f9f', fontFamily: 'Poppins' }),
                              height: '52px',
                              fontSize: '16px',
                              fontWeight: '300',
                            }}
                          >
                            <span
                              className="d-inline-block list-text fontweight  rounded-circle p-1"
                              style={
                                CropOption
                                  ? { backgroundColor: '#4bb7c3' }
                                  : { backgroundColor: '#9f9f9f' }
                              }
                            ></span>
                            CROPS
                          </a>
                        </button>
                      </li>
                      <li className="border-top"></li>

                      <li id="list" onClick={() => handleClick('/tasks')}>
                        <button
                          onClick={() => {
                            TaskOptionhandler();
                            checkOuterOption();
                          }}
                          className="mybutton"
                        >
                          <a
                            className="dropdown-item d-flex list-text align-items-center gap-2 py-2"
                            href="/tasks"
                            style={{
                              ...(TaskOption
                                ? { color: '#4bb7c3', fontFamily: 'Poppins' }
                                : { color: '#9f9f9f', fontFamily: 'Poppins' }),
                              height: '52px',
                              fontSize: '16px',
                              fontWeight: '300',
                            }}
                          >
                            <span
                              className="d-inline-block list-text fontweight   rounded-circle p-1"
                              style={
                                TaskOption
                                  ? { backgroundColor: '#4bb7c3' }
                                  : { backgroundColor: '#9f9f9f' }
                              }
                            ></span>
                            TASKS
                          </a>
                        </button>
                      </li>
                      <li className="border-top "></li>
                      {isAdmin && (
                        <li
                          id="list"
                        >
                          <button
                            onClick={() => {
                              ProdutOptionhandler();
                              checkOuterOption();
                            }}
                            className="mybutton"
                          >
                            <a
                              className="dropdown-item list-text d-flex align-items-center gap-2 py-2"
                              href="/store_front"
                              style={{
                                ...(ProductOption
                                  ? { color: '#4bb7c3', fontFamily: 'Poppins' }
                                  : { color: '#9f9f9f', fontFamily: 'Poppins' }),
                                height: '52px',
                                fontSize: '16px',
                                fontWeight: '300',
                              }}
                            >
                              <span
                                className="d-inline-block list-text fontweight  rounded-circle p-1"
                                style={
                                  ProductOption
                                    ? { backgroundColor: '#4bb7c3' }
                                    : { backgroundColor: '#9f9f9f' }
                                }
                              ></span>
                              PRODUCT STORE
                            </a>
                          </button>
                        </li>
                      )}

                      <li className="border-top "></li>
                      {isAdmin && (
                        <li
                          id="list"
                        >
                          <button
                            onClick={() => {
                              ServiceOptionhandler();
                              checkOuterOption();
                            }}
                            className="mybutton"
                          >
                            <a
                              className="dropdown-item d-flex list-text align-items-center gap-2 py-2"
                              style={{
                                ...(ServiceOption
                                  ? { color: '#4bb7c3', fontFamily: 'Poppins' }
                                  : { color: '#9f9f9f', fontFamily: 'Poppins' }),
                                height: '52px',
                                fontSize: '16px',
                                fontWeight: '300',
                              }}
                              href="/service_front"
                            >
                              <span
                                className="d-inline-block list-text  rounded-circle p-1"
                                style={
                                  ServiceOption
                                    ? { backgroundColor: '#4bb7c3' }
                                    : { backgroundColor: '#9f9f9f' }
                                }
                              ></span>
                              SERVICE STORE
                            </a>
                          </button>
                        </li>
                      )}
                      <li className="border-top "></li>

                      {isAdmin && (
                        <li
                          id="list"
                          onClick={() => {
                            // handleClick('/documents');
                          }}
                        >
                          <button
                            onClick={() => {
                              DocumentOptionhandler();
                              renderDocument();
                              checkOuterOption();
                            }}
                            className="mybutton"
                          >
                            <a
                              className="dropdown-item d-flex list-text align-items-center gap-2 py-2"
                              style={{
                                ...(DocumentOption
                                  ? { color: '#4bb7c3', fontFamily: 'Poppins' }
                                  : { color: '#9f9f9f', fontFamily: 'Poppins' }),
                                height: '52px',
                                fontSize: '16px',
                                fontWeight: '300',
                              }}
                            href="/documents"
                            >
                              <span
                                className="d-inline-block list-text  rounded-circle p-1"
                                style={
                                  DocumentOption
                                    ? { backgroundColor: '#4bb7c3' }
                                    : { backgroundColor: '#9f9f9f' }
                                }
                              ></span>
                              DOCUMENT
                            </a>
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </>
              )}
            </li>
            {showFinances || (
              <li className="mb-0">
                {Finaceoption ? (
                  <div className="active-bar"></div>
                ) : (
                  <div className="active-bar toggleDisplay"></div>
                )}

                <a href='/Finances'>
                  <button
                    id="list"
                    className="btn btn-toggle d-inline-flex align-items-center rounded fontweight   collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#dashboard-collapse"
                    aria-expanded="true"
                    style={
                      Finaceoption
                        ? { color: '#4bb7c3', width: '23rem', height: '5rem' }
                        : { color: '#666666', width: '23rem', height: '5rem' }
                    }
                    onClick={() => {
                      FinanceBar();
                      renderFinance();
                      checkActiveManage();
                    }}
                  >
                    {Finaceoption ? (
                      <img
                        src={financeIcon2}
                        style={{
                          marginLeft: '0px',
                          marginRight: '-5px',
                          position: 'relative',
                          left: '-2px',
                        }}
                      />
                    ) : (
                      <img
                        src={financeIcon1}
                        style={{
                          marginLeft: '0px',
                          marginRight: '-5px',
                          position: 'relative',
                          left: '-2px',
                        }}
                      />
                    )}
                    <span
                      style={
                        Finaceoption
                          ? {
                            color: '#4bb7c3',
                            position: 'absolute',
                            left: '74px',
                            fontFamily: 'Poppins',
                          }
                          : {
                            color: '#666666',
                            position: 'absolute',
                            left: '74px',
                            fontFamily: 'Poppins',
                          }
                      }
                    >
                      FINANCES
                    </span>
                  </button>
                </a>
              </li>
            )}

            <li className="mb-0">
              {Insightoption ? (
                <div className="active-bar"></div>
              ) : (
                <div className="active-bar toggleDisplay"></div>
              )}
              <a href='/Insights'>
                <button
                  id="list"
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 fontweight  collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#orders-collapse"
                  aria-expanded="true"
                  style={
                    Insightoption
                      ? { color: '#4bb7c3', width: '23rem', height: '5rem' }
                      : { color: '#666666', width: '23rem', height: '5rem' }
                  }
                  onClick={() => {
                    InsightBar();
                    renderInsights();
                    checkActiveManage();
                  }}
                >
                  {Insightoption ? (
                    <img
                      src={Insights}
                      style={{
                        marginLeft: '0px',
                        marginRight: '2px',
                        position: 'relative',
                        left: '2px',
                      }}
                    />
                  ) : (
                    <img
                      src={Insights}
                      style={{
                        marginLeft: '0px',
                        marginRight: '2px',
                        position: 'relative',
                        left: '2px',
                      }}
                    />
                  )}
                  <span
                    style={
                      Insightoption
                        ? {
                          color: '#4bb7c3',
                          position: 'absolute',
                          left: '74px',
                          fontFamily: 'Poppins',
                        }
                        : {
                          color: '#666666',
                          position: 'absolute',
                          left: '74px',
                          fontFamily: 'Poppins',
                        }
                    }
                  >
                    INSIGHTS
                  </span>
                </button>
              </a>
              <div className="collapse" id="orders-collapse"></div>
            </li>
            <a className="dropdown-item d-flex align-items-center gap-2 py-2" href="/map">
              <li className="mb-0">
                {Myfarmoption ? (
                  <div className="active-bar"></div>
                ) : (
                  <div className="active-bar toggleDisplay"></div>
                )}
                <button
                  className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#orders-collapse"
                  aria-expanded="true"
                  id="list"
                  style={
                    Myfarmoption
                      ? { color: '#4bb7c3', width: '23rem', height: '5rem', fontWeight: '500' }
                      : { color: '#666666', width: '23rem', height: '5rem', fontWeight: '500' }
                  }
                  onClick={() => {
                    MyfarmBar();
                    checkActiveManage();
                  }}
                >
                  {Myfarmoption ? (
                    <img
                      src={myFarmicon2}
                      style={{
                        marginLeft: '0px',
                        marginRight: '2px',
                        position: 'relative',
                        left: '0px',
                      }}
                    />
                  ) : (
                    <img
                      src={myFarmicon1}
                      style={{
                        marginLeft: '0px',
                        marginRight: '2px',
                        position: 'relative',
                        left: '0px',
                      }}
                    />
                  )}
                  <span
                    style={
                      Myfarmoption
                        ? {
                          color: '#4bb7c3',
                          position: 'absolute',
                          left: '74px',
                          fontFamily: 'Poppins',
                        }
                        : {
                          color: '#666666',
                          position: 'absolute',
                          left: '74px',
                          fontFamily: 'Poppins',
                        }
                    }
                  >
                    MYFARM
                  </span>
                </button>
                <div className="collapse" id="orders-collapse"></div>
              </li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
Sidemenu.prototype = {
  history: PropTypes.object,
  manageOpen: PropTypes.bool,
  closeDrawer: PropTypes.func,
  toggleManage: PropTypes.func,
  setDefaultDateRange: PropTypes.func,
  showFinances: PropTypes.bool,
  setdisplayCrop: PropTypes.func,
  setmainShower: PropTypes.func,
};
