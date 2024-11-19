import db from '../../models/index.js';
import jwt from 'jsonwebtoken';

const Tasks = db.Tasks;

const add = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    const decoded = jwt.verify(token, 'secret');

    const user_id = decoded.id;
    const { title, description, due_date, status } = req.body;
    const existingTask = await Tasks.findOne({ where: { title: title } });

    if (existingTask) {
      return res
        .status(400)
        .json({ message: 'Tasks with the same title already exists!' });
    }

    const createdTask = await Tasks.create({
      title,
      description,
      due_date,
      status,
      user_id,
    });

    return res.status(200).json({
      message: 'Task successfully.',
      task: createdTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating task!',
      error: error.message,
    });
  }
};

export { add };
