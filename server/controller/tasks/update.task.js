import db from '../../models/index.js';
import jwt from 'jsonwebtoken';

const Tasks = db.Tasks;

const update = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, 'secret');

    const user_id = decoded.id;
    const { task_id, title, description, due_date, status } = req.body;

    if (!task_id) {
      return res.status(400).json({ message: 'task_id is required!' });
    }

    const task = await Tasks.findOne({ where: { task_id } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.due_date = due_date || task.due_date;
    task.status = status || task.status;
    task.user_id = user_id || task.user_id;

    await task.save();

    return res.status(200).json({
      message: 'Task updated successfully.',
      task: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error updating task!',
      error: error.message,
    });
  }
};

export { update };
