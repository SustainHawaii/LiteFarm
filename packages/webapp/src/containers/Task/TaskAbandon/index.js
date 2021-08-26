import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PureAbandonTask from '../../../components/Task/AbandonTask';
import { taskSelectorById } from '../../taskSlice';
import { isAdminSelector, loginSelector } from '../../userFarmSlice';
import { abandonTask } from '../saga';

function TaskAbandon({ history, match }) {
  const { task_id } = match.params;
  const task = useSelector(taskSelectorById(task_id));
  const { user_id } = useSelector(loginSelector);
  const isAdmin = useSelector(isAdminSelector);
  const dispatch = useDispatch();

  const backPath = `/tasks/${task_id}/read_only`;

  useEffect(() => {
    // Redirect user to the task's read only view if task is abandoned
    // or if user is worker and not assigned to the task
    if (task.abandoned_time || (!isAdmin && task.assignee_user_id !== user_id)) {
      history.push(backPath);
    }
  }, []);

  const onSubmit = (data) => {
    let patchData = {
      abandonment_reason: data.reason_for_abandonment.value,
      abandonment_notes: data.abandonment_notes,
    };
    if (patchData.abandonment_reason === 'OTHER') {
      patchData.other_abandonment_reason = data.other_abandonment_reason;
    }
    dispatch(abandonTask({ task_id, patchData }));
  };

  const onGoBack = () => {
    history.push(backPath);
  };

  return <PureAbandonTask onSubmit={onSubmit} onGoBack={onGoBack} />;
}

export default TaskAbandon;