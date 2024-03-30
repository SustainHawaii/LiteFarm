/*
 *  Copyright 2019, 2020, 2021, 2022 LiteFarm.org
 *  This file is part of LiteFarm.
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
import Layout from '../../components/Layout';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import PageTitle from '../../components/PageTitle/v2';
import { AddLink, Semibold, Underlined } from '../../components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  isAdminSelector,
  userFarmEntitiesSelector,
  userFarmsByFarmSelector,
  userFarmSelector,
} from '../userFarmSlice';
import { resetAndUnLockFormData } from '../hooks/useHookFormPersist/hookFormPersistSlice';
import { getManagementPlansAndTasks } from '../saga';
import TaskCard from './TaskCard';
import { onAddTask } from './onAddTask';

import {
  isFilterCurrentlyActiveSelector,
  setTasksFilter,
  tasksFilterSelector,
  setTasksFilterUnassignedDueThisWeek,
  setTasksFilterDueToday,
  updateTasksFilterObjects,
  clearTasksFilter,
} from '../filterSlice';

import produce from 'immer';
import {
  IS_ASCENDING,
  STATUS,
  ABANDONED,
  ASSIGNEE,
  COMPLETED,
  CROP,
  FROM_DATE,
  LATE,
  LOCATION,
  PLANNED,
  TO_DATE,
  TYPE,
} from '../Filter/constants';
import { DATE_RANGE, SEARCHABLE_MULTI_SELECT } from '../../components/Filter/filterTypes';
import { WEEKLY_UNASSIGNED_TASKS, DAILY_TASKS_DUE_TODAY } from '../Notification/constants';
import { filteredTaskCardContentSelector } from './taskCardContentSelector';
import TaskCount from '../../components/Task/TaskCount';
import { getTaskTypes } from './saga';
import { getAllUserFarmsByFarmId } from '../Profile/People/saga';
import { defaultTaskTypesSelector, userCreatedTaskTypesSelector } from '../taskTypeSlice';
import { getSupportedTaskTypesSet } from '../../components/Task/getSupportedTaskTypesSet';
import { locationsSelector } from '../locationSlice';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { filter } from 'lodash';
import { FilterDateRange } from '../../components/Filter/FilterDateRange';
import LocationCreationModal from '../../components/LocationCreationModal';
import { tasksSelector } from '../taskSlice';
import './Styles.css';

export default function TaskPage({ history }) {
  const { t } = useTranslation(['translation', 'filter', 'tasks']);
  const tasks = useSelector(tasksSelector);
  const isAdmin = useSelector(isAdminSelector);
  const { user_id, farm_id, first_name, last_name } = useSelector(userFarmSelector);
  const taskCardContents = useSelector(filteredTaskCardContentSelector);
  const dispatch = useDispatch();
  const activeUsers = useSelector(userFarmsByFarmSelector).filter(
    (user) => user.status !== 'Inactive',
  );
  const defaultTaskTypes = useSelector(defaultTaskTypesSelector);
  const customTaskTypes = useSelector(userCreatedTaskTypesSelector);
  const locations = useSelector(locationsSelector);
  
  const tasksFilter = useSelector(tasksFilterSelector);
  const isFilterCurrentlyActive = useSelector(isFilterCurrentlyActiveSelector('tasks'));
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const onFilterClose = () => {
    setIsFilterOpen(false);
  };
  const onFilterOpen = () => {
    setIsFilterOpen(true);
  };
  
  const usemainStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginBottom: '6rem',
      height: '25vh',
      flexWrap: 'wrap',
      width: '80vw',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(15),
        height: theme.spacing(23),
      },
      paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        textAlign: 'center',
        display: 'flex',
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'background 0.3s ease',
        '&:hover': {
          background: '#fff',
          borderColor: '#4bb7c3',
        },
      },
      Cardcontainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      },
    },
    applyButton: {
      backgroundColor: '#4bc7c3',
      color: ' white',
      cursor: 'pointer',
      DISPLAY: 'flex',
      justifycontent: 'center',
      left: '1.2vw',
      width: '20vw',
      border: '1px solid #ccc',
      borderRadius: '4px',
      height: '7vh',
      fontFamily: 'Poppins',
      top: '-1rem',
      position: 'relative',
      alignItems: 'center',
      fontSize: '1.5rem',
      transition: 'background 0.3s ease',
      '&:hover': {
        background: '#fff',
        borderColor: '#4bc7c3',
        color: '#4bc7c3',
      },
    },
  }));
  const mainclasses = usemainStyles();
  
  const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);
  const [Tasksnumber, setTasksnumber] = useState(0);
  
  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(4),
    },
    container: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '70vw',
      marginLeft: '-1.4rem',
      position: 'relative',
      flexWrap: 'wrap',
      right: '2rem',
      left: '1rem',
      height: '20rem',
      bottom: '6rem',
      marginTop: '5rem',
    },
    Selector: {
      // left: '-22.4rem',
      width: '15rem',
      marginLeft: '8.3rem',
      position: 'absolute',
    },
    Selector2: {
      width: '15rem',
      marginLeft: '6rem',
      position: 'absolute',
    },
    Selector3: {
      width: '15rem',
      marginLeft: '4rem',
      position: 'absolute',
    },
    Selector4: {
      width: '15rem',
      marginLeft: '1rem',
      position: 'absolute',
      top: '4rem',
      left: '-32.3rem',
    },
    Selector5: {
      width: '15rem',
      marginLeft: '1rem',
      position: 'absolute',
      top: '4rem',
      left: '-67.3rem',
    },
    filterContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '70vw',
      height: '25vh',
      position: 'relative',
      marginBottom: '3rem',
      top: '3rem',
      right: '10%',
      left: '-2.5rem',
      
    },
    Datecontainer: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      left: '14rem',
    },
    Datecontainer2: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'space-between',
      left: '30rem',
    },
    PickerButton: {
      height: '5rem',
      width: '20rem',
      display: 'flex',
      top: '-1rem',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #D8D9DA',
      borderRadius: '8px',
      margin: '-2rem',
      left: '-12rem',
    },
    PickerButton2: {
      height: '5rem',
      width: '20rem',
      display: 'flex',
      top: '-1rem',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid #D8D9DA',
      borderRadius: '8px',
      margin: '6rem',
      left: '-12rem',
    },
    label: {
      fontSize: '4rem',
    },
    
  }));
  const taskTypes = useMemo(() => {
    const supportedTaskTypes = getSupportedTaskTypesSet(true);
    const taskTypes = [];
    for(const type of defaultTaskTypes) {
      if(type.deleted === false && supportedTaskTypes.has(type.task_translation_key)) {
        taskTypes.push(type);
      }
    }
    for(const type of customTaskTypes) {
      if(type.deleted === false) {
        taskTypes.push(type);
      }
    }
    return taskTypes;
  }, [defaultTaskTypes, customTaskTypes]);
  
  useEffect(() => {
    dispatch(updateTasksFilterObjects({ activeUsers, taskTypes, locations, t }));
  }, [activeUsers.length, taskTypes.length]);
  
  useEffect(() => {
    dispatch(getTaskTypes());
    dispatch(getAllUserFarmsByFarmId());
    dispatch(getManagementPlansAndTasks());
    dispatch(resetAndUnLockFormData());
    
    const context = history.location?.state;
    
    let notificationDate;
    if(context?.notification_date) {
      const tempDate = new Date(context?.notification_date);
      notificationDate = new Date(
        tempDate.getUTCFullYear(),
        tempDate.getUTCMonth(),
        tempDate.getUTCDate(),
      );
    } else {
      notificationDate = new Date();
    }
    
    switch(context?.notification_type) {
      case WEEKLY_UNASSIGNED_TASKS:
        dispatch(setTasksFilterUnassignedDueThisWeek({ date: notificationDate }));
        break;
      case DAILY_TASKS_DUE_TODAY:
        dispatch(
          setTasksFilterDueToday({ user_id, first_name, last_name, date: notificationDate }),
        );
        break;
      default:
        break;
    }
  }, []);
  
  const assigneeValue = useMemo(() => {
    let unassigned;
    let myTask;
    for(const [assignee, { active }] of Object.entries(tasksFilter.ASSIGNEE)) {
      if(assignee === 'unassigned' && active) {
        unassigned = true;
      } else if(assignee === user_id && active) {
        myTask = true;
      } else if(active) {
        return undefined;
      }
    }
    if(unassigned && !myTask) return 'unassigned';
    if(myTask) return 'myTask';
    return 'all';
  }, [tasksFilter.ASSIGNEE]);
  const onAssigneeChange = (e) => {
    const assigneeValue = e.target.value;
    dispatch(
      setTasksFilter(
        produce(tasksFilter, (tasksFilter) => {
          for(const assignee in tasksFilter.ASSIGNEE) {
            tasksFilter.ASSIGNEE[assignee].active = false;
          }
          if(assigneeValue === 'myTask') {
            tasksFilter.ASSIGNEE[user_id] = { active: true, label: `${first_name} ${last_name}` };
          } else if(assigneeValue === 'unassigned') {
            tasksFilter.ASSIGNEE.unassigned = { active: true, label: t('TASK.UNASSIGNED') };
          }
        }),
      ),
    );
  };
  const onDateOrderChange = (e) => {
    const dateOrderValue = e.target.value;
    dispatch(
      setTasksFilter(
        produce(tasksFilter, (tasksFilter) => {
          tasksFilter[IS_ASCENDING] = dateOrderValue === 'ascending';
        }),
      ),
    );
  };
  
  const resetFilter2 = () => {
    dispatch(clearTasksFilter());
    triggerReset();
    setSelectedValues({});
  };
  
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const filterRef = useRef({});
  const statuses = [ABANDONED, COMPLETED, LATE, PLANNED];
  
  const cropVarietyEntities = useMemo(() => {
    return tasks.reduce((cropVarietyEntities, { managementPlans }) => {
      for(const managementPlan of managementPlans) {
        const cropVariety = managementPlan.crop_variety;
        const crop = cropVariety.crop;
        const cropName = t(`crop:${crop.crop_translation_key}`);
        cropVarietyEntities[cropVariety.crop_variety_id] = cropVariety.crop_variety_name
          ? `${cropVariety.crop_variety_name},${cropName}`
          : cropName;
      }
      
      return cropVarietyEntities;
    }, {});
  }, [tasks.length]);
  
  const [shouldReset, setShouldReset] = useState(0);
  const triggerReset = () => setShouldReset((shouldReset) => shouldReset + 1);
  
  const { assignees } = useMemo(() => {
    let assignees = {};
    for(const task of tasks) {
      if(task.assignee != undefined) {
        const { user_id, first_name, last_name } = task.assignee;
        assignees[user_id] = `${first_name} ${last_name}`;
      }
    }
    for(const user of activeUsers) {
      assignees[user[user_id]] = `${user['first_name']} ${user['last_name']}`;
    }
    assignees['unassigned'] = t('TASK.UNASSIGNED');
    return { taskTypes, assignees };
  }, [tasks.length, activeUsers]);
  const newFilters = [
    {
      subject: t('TASK.FILTER.STATUS'),
      filterKey: STATUS,
      options: statuses.map((status) => ({
        value: status.toLowerCase(),
        default: tasksFilter[STATUS][status.toLowerCase()]?.active ?? false,
        label: t(`filter:TASKS.${status}`),
      })),
    },
    {
      subject: t('TASK.FILTER.TYPE'),
      filterKey: TYPE,
      type: SEARCHABLE_MULTI_SELECT,
      options: Object.values(taskTypes).map((type) => ({
        value: type.task_name,
        default: tasksFilter[TYPE][type.task_type_id]?.active ?? false,
        label: t(`task:${type.task_translation_key}`),
      })),
    },
    {
      subject: t('TASK.FILTER.LOCATION'),
      filterKey: LOCATION,
      type: SEARCHABLE_MULTI_SELECT,
      options: locations.map(({ location_id, name }) => ({
        value: name,
        default: tasksFilter[LOCATION][location_id]?.active ?? false,
        label: name,
      })),
    },
    {
      subject: t('TASK.FILTER.ASSIGNEE'),
      filterKey: ASSIGNEE,
      type: SEARCHABLE_MULTI_SELECT,
      options: Object.keys(assignees).map((user_id) => ({
        value: assignees[user_id],
        default: tasksFilter[ASSIGNEE][user_id]?.active ?? false,
        label: assignees[user_id],
      })),
    },
    
    {
      subject: t('TASK.FILTER.CROP'),
      filterKey: CROP,
      type: SEARCHABLE_MULTI_SELECT,
      options: Object.entries(cropVarietyEntities).map(([crop_variety_id, name]) => ({
        value: name,
        default: tasksFilter[CROP][crop_variety_id]?.active ?? false,
        label: name,
      })),
    },
  ];
  
  const resetOptions = newFilters.flatMap((filter) => filter.options);
  
  const defaultFilterState = useMemo(() => {
    return resetOptions.reduce((defaultFilterState, option) => {
      defaultFilterState[option.value] = {
        active: option.default,
        label: option.label,
      };
      return defaultFilterState;
    }, {});
  });
  
  const [filterState, setFilterState] = useState(defaultFilterState);
  useEffect(() => {
    if(shouldReset) {
      const initState = resetOptions.reduce((defaultFilterState, option) => {
        defaultFilterState[option.value] = {
          active: false,
          label: option.label,
        };
        return defaultFilterState;
      }, {});
      setFilterState(initState);
    }
  }, [shouldReset]);
  const handleApply = () => {
    dispatch(setTasksFilter(filterRef.current));
  };
  const resetFilter = () => dispatch(clearTasksFilter());
  const [isDirty, setIsDirty] = useState(false);
  const setDirty = () => !isDirty && setIsDirty(true);
  
  const [selectedValues, setSelectedValues] = useState({});
  
  const handleDropdownChange = (filterKey, selectedValue) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [filterKey]: selectedValue,
    }));
  };
  
  const [createLocation, setCreateLocation] = useState(false);
  const dismissLocationCreationModal = () => {
    setCreateLocation(false);
  };
 
  return (
    <Layout classes={{ container: { backgroundColor: 'white' } }}>
      <div className='container d-none'></div>
      <PageTitle title={t('TASK.PAGE_TITLE')} style={{ paddingBottom: '20px', left: '0rem', fontWeight: 'bolder' }} />
      <div className='container'>
        <h2 style={{ color: 'gray', marginBottom: '2rem', position: 'relative' }}>View:</h2>
        <div className='container' style={{ position: 'relative', left: '0.9rem' }}>
          <FormControl component='fieldset'>
            <FormControlLabel
              value='end'
              style={{ color: 'black', marginBottom: '2rem' }}
              control={
                <Checkbox
                  defaultChecked
                  checked={assigneeValue === 'myTask'}
                  name={'assignee'}
                  value={'myTask'}
                  onChange={onAssigneeChange}
                  sx={{
                    borderColor: '#ccc',
                    '&.Mui-checked': {
                      color: 'red',
                    },
                  }}
                  color='#000'
                  style={{
                    color: '#4bc7c3',
                    borderColor: '#000',
                    fontFamily: 'Poppins',
                    transform: 'scale(1.5)',
                  }}
                  inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
                />
              }
              label='My tasks'
              labelPlacement='end'
            />
          </FormControl>
          
          <FormControlLabel
            value='end'
            style={{ color: 'black' }}
            control={
              <Checkbox
                defaultChecked
                checked={assigneeValue === 'unassigned'}
                label={t('TASK.FILTER.UNASSIGNED')}
                onChange={onAssigneeChange}
                name={'assignee'}
                value={'unassigned'}
                color='#000'
                style={{
                  color: '#4bc7c3',
                  fontFamily: 'Poppins',
                  borderColor: '#000',
                  transform: 'scale(1.5)',
                }}
                inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
              />
            }
            label='Unassigned'
            labelPlacement='end'
          />
          <FormControlLabel
            style={{ color: 'black' }}
            value='end'
            control={
              <Checkbox
                defaultChecked
                checked={assigneeValue === 'all'}
                label={t('common:ALL')}
                name={'assignee'}
                value={'all'}
                onChange={onAssigneeChange}
                color='#000'
                style={{
                  color: '#4bc7c3',
                  fontFamily: 'Poppins',
                  borderColor: '#000',
                  transform: 'scale(1.5)',
                }}
                inputLabelProps={{ 'aria-label': 'secondarycheckbox', fontSize: '4rem' }}
              />
            }
            label='All'
            labelPlacement='end'
          />
        </div>
        <div className={`container marketing`}>
          <div className='row'>
            {newFilters.map((filter) => (
              <select
                key={filter.filterKey}
                className='form-state  col-lg-4'
                fdprocessedid='t861mh'
                style={{
                  height: '65px',
                  width: '44%',
                  color: '#ccc',
                  marginLeft: '1rem',
                  border: '1px solid #ccc',
                  fontSize: '18px',
                  paddingLeft: '10px',
                  fontFamily: 'Poppins',
                  borderRadius: '6px',
                  
                }}
                value={selectedValues[filter.filterKey] || ''}
                onChange={(e) => handleDropdownChange(filter.filterKey, e.target.value)}
              >
                
                <option value='' onChange={setDirty}>
                  {filter.subject}
                </option>
                {filter.options.map((option) => (
                  <option
                    key={option.key}
                    value={option.value}
                    selected={(e) => {
                      setSelectedValues(e.target.value);
                    }}
                    onChange={setDirty}
                    onReset={() => {
                      triggerReset();
                    }}
                  >
                  <span className='option-container'

                  > {option.label}</span>
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>
      <hr className='featurette-divider'></hr>
      
      
      <div className='row featurette my-3' style={{ position: 'relative', top: '0.4rem' }}>
        <h2
          style={{
            color: 'gray',
            fontFamily: 'Poppins',
            marginBottom: '1rem',
            left: '1.1rem',
            position: 'relative',
          }}
        >
          Filter Report By Date
        </h2>
        <div
          className='row featurette'
          style={{ position: 'relative', left: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className='row gy-3'>
            <div className='col-md-6'>
              <FilterDateRange
                setDirty={setDirty}
                key={filter.subject}
                filterRef={filterRef}
                handleApply={handleApply}
                shouldReset={shouldReset}
                style={{ marginBottom: '32px' }}
                {...filter}
              />
            
            </div>
          
          </div>
          <div className='row featurette'>
            <div className='row gy-3'>
              <div className='col-md-8 ' style={{ marginTop: '-3rem' }}>
                <Button
                  variant='contained'
                  className='task-button mx-2 my-2'
                >
                  {Tasksnumber} Tasks
                </Button>
                <Button
                  className='container-button mx-2 my-2'
                  onClick={() => {
                    resetFilter2();
                  }}
                >
                  Clear all filters
                </Button>
                <Button
                  className='container-button mx-2 my-2'
                  onClick={() => { locations.length ? onAddTask(dispatch, history, {}) : setCreateLocation(true);}}
                >
                  <AddLink style={{ position: 'relative', top: '7px' }}>{t('TASK.ADD_TASK')}</AddLink>
                  {createLocation && (
                    <LocationCreationModal
                      title={t('LOCATION_CREATION.TASK_TITLE')}
                      body={
                        isAdmin ? t('LOCATION_CREATION.TASK_BODY') : t('LOCATION_CREATION.TASK_BODY_WORKER')
                      }
                      dismissModal={dismissLocationCreationModal}
                      isAdmin={isAdmin}
                    />
                  )}
                </Button>
              </div>
            
            
            </div>
          </div>
        
        </div>
      
      </div>
      
      
      <hr className='featurette-divider'></hr>
      <div className='container d-block' style={{ marginTop: '3rem', position: 'absolute' }}>
        <div className='container d-none'>
          <TaskCount
            count={taskCardContents.length}
            handleAddTask={onAddTask(dispatch, history, {})}
            isAdmin={isAdmin}
            setTasksnumber={setTasksnumber}
          />
        </div>
        
        {taskCardContents.length > 0 ? (
          _.map(
            _.filter(taskCardContents, (taskcard) => {
              const mainAssignee = taskcard.assignee
                ? taskcard.assignee.first_name.concat(' ', taskcard.assignee.last_name)
                : '';
              const passFilter =
                (!selectedValues['STATUS'] || taskcard.status === selectedValues['STATUS']) &&
                (!selectedValues['TYPE'] || taskcard.taskType.task_name === selectedValues['TYPE']) &&
                (!selectedValues['LOCATION'] || taskcard.locationName === selectedValues['LOCATION']) &&
                (!selectedValues['ASSIGNEE'] || mainAssignee === selectedValues['ASSIGNEE']) &&
                (!selectedValues['CROP'] || taskcard.cropVarietyName === selectedValues['CROP']);
              
              return passFilter;
              
            }),
            (task) => (
              <TaskCard
                key={task.task_id}
                onClick={() => history.push(`/tasks/${task.task_id}/read_only`)}
                style={{ marginBottom: '14px' }}
                {...task}
              />
            ),
          )
        ) : (
          <Semibold style={{ color: 'var(--green)' }}>{t('TASK.NO_TASKS_TO_DISPLAY')}</Semibold>
        )}
      
      </div>
    </Layout>
  );
}
