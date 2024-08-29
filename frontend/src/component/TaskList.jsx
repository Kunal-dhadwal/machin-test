import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskForm from './TaskForm';

const TaskList = () => {
  const { tasks, getTasks, deleteTask } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div>
      <h2>Your Tasks</h2>
      <TaskForm />
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
            <TaskForm task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
