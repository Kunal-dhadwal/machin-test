import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskForm = ({ task }) => {
  const { addTask, updateTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: task ? task.title : '',
    description: task ? task?.description : '',
    status: task ? task?.status : 'pending',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      updateTask(task._id, formData);
    } else {
      addTask(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
