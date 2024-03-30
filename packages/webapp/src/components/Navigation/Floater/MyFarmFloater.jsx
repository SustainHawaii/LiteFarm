import React, { useState } from 'react';
import { ReactComponent as FarmMapIcon } from '../../../assets/images/farm-profile/farm-map.svg';
import { ReactComponent as FarmInfoIcon } from '../../../assets/images/farm-profile/farm-info.svg';
import { ReactComponent as PeopleIcon } from '../../../assets/images/farm-profile/people.svg';
import { ReactComponent as CertificationsIcon } from '../../../assets/images/farm-profile/certificate.svg';
import ListOption from '../NavBar/ListOption';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { userFarmSelector } from '../../../containers/userFarmSlice';
import { Floater } from './Floater';
import activeInfo from './../../../assets/icons/info/activateInfo.png';
import deactiveInfo from './../../../assets/icons/info/deactivateInfo.png';
import activeMap from './../../../assets/icons/maps/activeMap.png';
import deactiveMap from './../../../assets/icons/maps/deactiveMap.png';
import activePeople from './../../../assets/icons/people/activeUser.png'
import deactivePeople from './../../../assets/icons/people/deactivateUser.png'
import activeCertifications from './../../../assets/icons/certifications/activeCertificate.png'
import deactiveCertifications from './../../../assets/icons/certifications/deactiveCertificate.png'
export function PureMyFarmFloaterComponent({ farmInfo, farmMap, people, certification, isAdmin }) {
  const { t } = useTranslation();
  const [infoActivation, setInfoActivation] = useState(false);
  const [infotextColor, setinfoTextColor] = useState('#9f9f9f');
  const [Farmicon, setFarmicon] = useState(deactiveInfo);

  const [mapActivation, setmapActivation] = useState(false);
  const [mapIcon, setmapIcon] = useState(deactiveMap);
  const [maptextColor, setmaptextColor] = useState('#9f9f9f');

  const [peopleActivate, setpeopleActivate] = useState(false);
  const [peopletextColor, setpeopletextColor] = useState('#9f9f9f');
  const [peopleIcon, setpeopleIcon] = useState(deactivePeople);

  const [certificateActive, setcertificateActive] = useState(false);
  const [certificatetextColor, setCertifiatetextColor] = useState('#9f9f9f');
  const [certificateActiveicon, setcertificateActiveicon] = useState(deactiveCertifications);

 

 const infoHandler = () => {
    setInfoActivation(true);
    setinfoTextColor('#4bb7c3');
    setFarmicon(activeInfo);
    setmapActivation(false);
    setmaptextColor('#9f9f9f');
    setmapIcon(deactiveMap);
    setpeopleActivate(false);
    setpeopletextColor('#9f9f9f');
    setpeopleIcon(deactivePeople);
    setcertificateActive(false)
    setcertificateActiveicon(deactiveCertifications);
    setCertifiatetextColor('#9f9f9f')
   
    if(farmInfo){
      farmInfo();
    }
    
  };

  const mapHandler = () => {
    setmapActivation(true);
    setmaptextColor('#4bb7c3');
    setmapIcon(activeMap);
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setpeopleActivate(false);
    setpeopletextColor('#9f9f9f');
    setpeopleIcon(deactivePeople);
    setcertificateActive(false)
    setcertificateActiveicon(deactiveCertifications);
    setCertifiatetextColor('#9f9f9f')
    if(farmMap){
      farmMap();
    }
  };

  const peopleHandler = () => {
    setpeopleActivate(true);
    setpeopletextColor('#4bb7c3');
    setpeopleIcon(activePeople);
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setmapActivation(false);
    setmaptextColor('#9f9f9f');
    setmapIcon(deactiveMap);
    setcertificateActive(false)
    setcertificateActiveicon(deactiveCertifications);
    setCertifiatetextColor('#9f9f9f')
    if(people){
      people();
    }
  };

  const certificateHandler = () => {
    setcertificateActive(true);
    setCertifiatetextColor('#4bb7c3');
    setcertificateActiveicon(activeCertifications);
    setInfoActivation(false);
    setinfoTextColor('#9f9f9f');
    setFarmicon(deactiveInfo);
    setmapActivation(false);
    setmaptextColor('#9f9f9f');
    setmapIcon(deactiveMap);
    setpeopleActivate(false);
    setpeopletextColor('#9f9f9f');
    setpeopleIcon(deactivePeople);
    if(certification){
      certification();
    }
  };

  return (
    <div
      style={{
        maxWidth: '13rem',
        minWidth: '138px',
        backgroundColor: 'white',
        borderRadius: '4px',
        marginRight: '-4px',
        width: '13rem',
      }}
    >
      <ListOption
        clickFn={() => {
          infoHandler();
        }}
        iconText='Farm Info'
        icon={<img src={Farmicon} style={{ height: '27px' }} />}
        customParagraphStyle={{ color: infotextColor }}
      />
      <ListOption
        clickFn={() => {
          mapHandler();
        }}
        customParagraphStyle={{ color: maptextColor }}
        iconText={t('MY_FARM.FARM_MAP')}
        icon={<img src={mapIcon} style={{ height: '27px' }} />}
      />
      <ListOption clickFn={()=>{
        peopleHandler();
      }}
      customParagraphStyle={{ color: peopletextColor }}
       iconText={t('MY_FARM.PEOPLE')} icon={<img src={peopleIcon} style={{height:'27px'}}/>} />
      {isAdmin && (
        <ListOption
          clickFn={()=>{
            certificateHandler()
          }}
          customParagraphStyle={{ color: certificatetextColor }}
          iconText={t('MY_FARM.CERTIFICATIONS')}
          icon={<img src={certificateActiveicon} style={{height:'27px'}} />}
        />
      )}
    </div>
  );
}

export default function PureMyFarmFloater({
  children,
  farmInfoClick,
  farmMapClick,
  peopleClick,
  certificationClick,
  openProfile,
}) {
  const { is_admin } = useSelector(userFarmSelector);
  const Wrapper = (
    <PureMyFarmFloaterComponent
      farmInfo={farmInfoClick}
      farmMap={farmMapClick}
      people={peopleClick}
      certification={certificationClick}
      isAdmin={is_admin}
    />
  );
  return (
    <Floater body={Wrapper} placement={'bottom-end'} open={openProfile}>
      {children}
    </Floater>
  );
}
