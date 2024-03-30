/*
 *  Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 *  This file (index.js) is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';
import styles from './styles.module.scss';
import MiddleLogo from '../../../assets/images/middle_logo.svg';
import truewealthLogo from '../../../assets/icons/logom8.gif';
export default function NoFarmNavBar({ history }) {
  return (
    <>
      <div className='container' style={{maxHeight: '60px', maxWidth: '100%'}} >
        <nav className='navbar' style={{justifyContent : 'spaceEvenly',  marginTop: '-75px'}}>
          <div className='navmenumain'>
            <ul className='nav_menu_top'>
              <li className='nav_item'>
                <a href='https://truewellth.care' className='nav_link'
                   style={{backgroundColor: '#42A5F5' , borderColor:  '#42A5F5'}}>Home</a>
              </li>
              <li className='nav_item'>
                <a href='https://diet.truewellth.care/' className='nav_link'
                   style={{ backgroundColor: '#81D4FA',
                     borderColor:  '#81D4FA'}}>Diet</a>
              </li>
              <li className='nav_item'>
                <a href='https://myhealth.truewellth.care' className='nav_link'
                   style={{backgroundColor: '#26A69A', borderColor:  '#26A69A'}}>My Health</a>
              </li>
              <li className='nav_item'>
                <a href='https://www.truewellth.market/pages/get-started' className='nav_link'
                   style={{backgroundColor: '#9CCC65', borderColor:  '#9CCC65'}}>Market</a>
              </li>
              <li className='nav_item'>
                <a href='https://grow.truewellth.market/' className='nav_link active_nav'
                   style={{backgroundColor: '#BDBDBD',borderColor:  '#BDBDBD'}}>Farmer</a>
              </li>
              <li className='nav_item'>
                <a href='https://soilmate.truewellth.market/' className='nav_link'
                   style={{backgroundColor: '#1B5E20',borderColor:  '#1B5E20'}}>Soil mate</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    <nav className={styles.navBar}>
      <div className={styles.itemContainer}>
        <img
          src={truewealthLogo}
          alt="Logo"
          className={styles.middleLogo}
          onClick={() => history.push('/')}
        />
      </div>
    </nav>
    </>
  );
}
