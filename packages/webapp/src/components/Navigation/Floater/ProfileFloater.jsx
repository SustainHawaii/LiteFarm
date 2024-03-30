import React from 'react';
import { useState } from 'react';
import { ReactComponent as LogoutIcon } from '../../../assets/images/navbar/logout.svg';
import { ReactComponent as MyInfoIcon } from '../../../assets/images/navbar/my-info.svg';
import { ReactComponent as HelpIcon } from '../../../assets/images/navbar/help-profile.svg';
import { ReactComponent as VideoIcon } from '../../../assets/images/video_icon.svg';
import { ReactComponent as SwitchFarmIcon } from '../../../assets/images/navbar/switch-farm.svg';
import ListOption from '../NavBar/ListOption';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Floater } from './Floater';
import activeInfo from './../../../assets/icons/info/activateinfo.png'
import deactiveInfo from './../../../assets/icons/info/deactivateinfo.png'
import activehelp from './../../../assets/icons/helpIcon/activehelp.png'
import deactivehelp from './../../../assets/icons/helpIcon/deactivehelp.png'
import activetutorial from './../../../assets/icons/tutorial/activeplay.png'
import deactivetutorial from './../../../assets/icons/tutorial/deactiveplay.png'
import activelogout from './../../../assets/icons/logout/activelogout.png'
import deactivelogout from './../../../assets/icons/logout/deactivelogout.png'
export function PureProfileFloaterComponent({
  onInfo,
  onSwitchFarm,
  onHelp,
  onTutorials,
  onLogout,
  intro = false,
}) {
  const { t } = useTranslation();
  const [infoActivation, setInfoActivation] = useState(false);
  const [infotextColor, setinfoTextColor] = useState('#9f9f9f');
  const [Farmicon, setFarmicon] = useState(deactiveInfo);
  const [helpActivation, sethelpActivation] = useState(false);
  const [helptextColor, sethelpTextColor] = useState('#9f9f9f');
  const [helpicon, sethelpicon] = useState(deactivehelp);
  const [tutorialActivation, setActitutorialvation] = useState(false);
  const [tutorialtextColor, settutorialTextColor] = useState('#9f9f9f');
  const [tutorialicon, settutorialicon] = useState(deactivetutorial);
  const [logoutActivation, setlogoutvation] = useState(false);
  const [logouttextColor, setlogoutTextColor] = useState('#9f9f9f');
  const [logouticon, setlogouticon] = useState(deactivelogout);
  const [switcfarmaActivation,setswitchfarmActivation] = useState(false);
  const [switchfarmtextColor,setswitchfarmtextColor] = useState("#9f9f9f")


  const infoHandler = () => {
    setInfoActivation(true);
    setinfoTextColor('#4bb7c3');
    setFarmicon(activeInfo);
    setlogoutTextColor('#9f9f9f')
    setlogouticon(deactivelogout);
    settutorialTextColor('#9f9f9f')
    settutorialicon(deactivetutorial);
    sethelpActivation(false)
    sethelpTextColor('#9f9f9f')
    sethelpicon(deactivehelp)
    setswitchfarmtextColor('#9f9f9f')
    if(onInfo){
      onInfo();
    }
  };
  const switchfarmHandler = () => {
    setswitchfarmtextColor('#4bb7c3')
    setlogoutTextColor('#9f9f9f')
    setlogouticon(activelogout);
    settutorialTextColor('#9f9f9f')
    settutorialicon(deactivetutorial);
    sethelpActivation(false)
    sethelpTextColor('#9f9f9f')
    sethelpicon(deactivehelp)
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    if(onSwitchFarm){
      onSwitchFarm()
    }
  };
  const helpHandler = () => {
    sethelpActivation(true)
    sethelpTextColor('#4bb7c3')
    sethelpicon(activehelp)
    settutorialTextColor('#9f9f9f')
    settutorialicon(deactivetutorial);
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setswitchfarmtextColor('#9f9f9f')
    if(onHelp){
      onHelp()
    }
  };
  const tutorialHandler = () => {
    settutorialTextColor('#4bb7c3')
    settutorialicon(activetutorial);
    sethelpActivation(false)
    sethelpTextColor('#9f9f9f')
    sethelpicon(deactivehelp)
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setswitchfarmtextColor('#9f9f9f')
    if(onTutorials){
      onTutorials();
    }
  };
  const logoutHandler = () => {
    setlogoutTextColor('#4bb7c3')
    setlogouticon(activelogout);
    settutorialTextColor('#9f9f9f')
    settutorialicon(deactivetutorial);
    sethelpActivation(false)
    sethelpTextColor('#9f9f9f')
    sethelpicon(deactivehelp)
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setswitchfarmtextColor('#9f9f9f')
    if(onLogout){
      onLogout();
    }
  };

  
  return (
    <div
      style={{
        maxWidth: '13rem',
        minWidth: '138px',
        backgroundColor: 'white',
        borderRadius: '4px',
        width:'13rem'
      }}
    >
      
      <ListOption clickFn={infoHandler} customParagraphStyle={{ color: infotextColor  }} iconText={t('PROFILE_FLOATER.INFO')} icon={<img src={Farmicon} style={{height:'27px'}}/>} />
      {!intro &&
      <ListOption
        // clickFn={onSwitchFarm}
        clickFn={()=>{
          switchfarmHandler();
        }}
        iconText={t('PROFILE_FLOATER.SWITCH')}
        customParagraphStyle={{ color: switchfarmtextColor  }} 
        icon={<SwitchFarmIcon style={{ transform: 'translateX(1px)' }} />}
      />
      }
      <ListOption clickFn={()=>{
        helpHandler();
      }} 
      customParagraphStyle={{ color: helptextColor  }} 
      iconText={t('PROFILE_FLOATER.HELP')} icon={<img src={helpicon} style={{height:'27px'}}/>} />
      
      <ListOption
        clickFn={()=>{
          tutorialHandler()
        }}
        customParagraphStyle={{ color: tutorialtextColor  }} 
        iconText={t('PROFILE_FLOATER.TUTORIALS')}
        icon={<img src={tutorialicon}  style={{height:'27px'}} />}
        isExternalLink
      />
      
      <ListOption
        clickFn={()=>{
          logoutHandler()
        }}
        iconText={t('PROFILE_FLOATER.LOG_OUT')}
        icon={<img  src={logouticon} style={{ transform: 'translateX(2px)',height:'27px' }} />}
        customParagraphStyle={{ paddingBottom: '0.5rem', paddingTop: '0.4rem',color:logouttextColor }}
      />
    </div>
  );
}

export default function PureProfileFloater({
  children,
  openProfile,
  helpClick,
  myInfoClick,
  logOutClick,
  switchFarmClick,
  tutorialsClick,
  intro = false,
}) {
  return (
    <Floater
      body={
        <PureProfileFloaterComponent
          intro={intro}
          onHelp={helpClick}
          onInfo={myInfoClick}
          onLogout={logOutClick}
          onTutorials={tutorialsClick}
          onSwitchFarm={switchFarmClick}
        />
      }
      placement={'bottom-end'}
      open={openProfile}
    >
      {children}
    </Floater>
  );
}

PureProfileFloaterComponent.prototype = {
  onInfo: PropTypes.func,
  onSwitchFarm: PropTypes.func,
  onHelp: PropTypes.func,
  onLogout: PropTypes.func,
};

PureProfileFloater.prototype = {
  myInfoClick: PropTypes.func,
  switchFarmClick: PropTypes.func,
  helpClick: PropTypes.func,
  logOutClick: PropTypes.func,
  children: PropTypes.node,
  openProfile: PropTypes.bool,
};
