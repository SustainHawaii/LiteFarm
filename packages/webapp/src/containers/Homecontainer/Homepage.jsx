import React, { useState } from 'react';
import Sidemenu from '../../components/Widthcontainer/mainSidebar/Sidemenu';
import CropCatalogue from '../CropCatalogue';
import Documents from '../Documents';
import './Style.css';
import Finances from '../Finances';
import Insights from '../Insights';
import Home from '../Home';
import { useMediaQuery } from '@material-ui/core';
import theme from '../../assets/theme';
const Homepage = () => {
  const [displayCrop, setDisplayCrop] = useState(false);
  const [displayDocument, setdisplayDocument] = useState(false);
  const [displayFinance, setdisplayFinance] = useState(false);
  const [displayInsights, setDisplayInsights] = useState(false);
  const [mainShower, setmainShower] = useState(false);
  const Sideshower = useMediaQuery(theme.breakpoints.up('md'));
  const hidder = useMediaQuery(theme.breakpoints.up('xl'));
  const hidder2 = useMediaQuery(theme.breakpoints.up('lg'));
  const hidder3 = useMediaQuery(theme.breakpoints.up('md'));
  const hidder4 = useMediaQuery(theme.breakpoints.up('sm'))
  const hidder5 = useMediaQuery(theme.breakpoints.up('xs'))
  return (
    <div>
      <div className="d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto" id="dynamic-container">
        {Sideshower ?
          <div className="container position-absolute">

            <Sidemenu
              setDisplayCrop={setDisplayCrop}
              setdisplayDocument={setdisplayDocument}
              setdisplayFinance={setdisplayFinance}
              setDisplayInsights={setDisplayInsights}
              setmainShower={setmainShower}
            />
          </div> : null
        }

      </div>

      <main className="col-lg-10 " id="dynamic-container" style={{ width: (hidder4 || hidder5) ? "100%" : "75vw", left: (hidder4 || hidder5) ? "0vw" : '25vw', display: 'flex', justifyContent: "center" }}>

        <div className={mainShower ? 'displayHider' : 'displayShower'} style={{ marginLeft: (!hidder || !hidder2 || !hidder3) ? "1.8rem" : "25vw", position: 'absolute', top: (!hidder || !hidder2 || !hidder3) ? "4vw" : "2vw" }}>
          <Home />
        </div>
        <div
          className={displayCrop ? 'displayShower' : 'displayHider'}
          style={{ left: '32px', position: 'relative', width: '67vw' }}
        >
          <CropCatalogue />
        </div>
        <div
          className={` ${displayDocument ? 'displayShower' : 'displayHider'} container`}
          style={{ left: '32px', position: 'relative', width: '67vw' }}
        >
          <Documents />
        </div>
        <div
          className={` ${displayFinance ? 'displayShower' : 'displayHider'} container`}
          style={{ left: '32px', position: 'relative', width: '67vw' }}
        >
          <Finances />
        </div>
        <div
          className={` ${displayInsights ? 'displayShower' : 'displayHider'} container`}
          style={{ left: '32px', position: 'relative', width: '67vw' }}
        >
          <Insights />
        </div>
      </main>
    </div>
  );
};

export default Homepage;
