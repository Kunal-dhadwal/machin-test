import React, { createContext, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const token = localStorage.getItem('authToken');
    const res = await axios.get('/api/tasks', {
      headers: {
        'x-auth-token': token,
      }
    });
    setTasks(res.data);
  };

  const addTask = async (taskData) => {
    const token = localStorage.getItem('authToken');
    const res = await axios.post('/api/tasks', taskData, {
      headers: {
        'x-auth-token': token,
      }
    });
    setTasks([...tasks, res.data]);
  };

  const updateTask = async (taskId, taskData) => {
    const token = localStorage.getItem('authToken');
    const res = await axios.put(`/api/tasks/${taskId}`, taskData, {
      headers: {
        'x-auth-token': token,
      }
    });
    setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
  };

  const deleteTask = async (taskId) => {
    const token = localStorage.getItem('authToken');
    await axios.delete(`/api/tasks/${taskId}`, {
      headers: {
        'x-auth-token': token,
      }
    });
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <TaskContext.Provider value={{ tasks, getTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
