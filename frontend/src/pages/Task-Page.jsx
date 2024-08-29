import React, { useContext } from 'react';
import TaskList from '../component/TaskList';
import { AuthContext } from '../context/AuthContext';

const TaskPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Manager</h1>
        <button onClick={logout} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      <TaskList />
    </div>
  );
};

export default TaskPage;
