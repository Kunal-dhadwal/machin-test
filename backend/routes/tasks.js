const express = require('express');
const auth = require('../middleware/authenticate');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({ title, description, user: req.user });
    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user) return res.status(401).json({ msg: 'Not authorized' });

    const { title, description, status } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.updatedAt = Date.now();

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    
    if (task.user.toString() !== req.user) return res.status(401).json({ msg: 'Not authorized' });
    
    await Task.deleteOne({_id:req.params.id});
    res.json({ msg: 'Task removed' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
    