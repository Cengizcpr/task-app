import db from '../../models/index.js';
const Tasks = db.Tasks;

const taskDetails = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Tasks.findOne({ where: { task_id: taskId } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({
      message: 'Error task details!',
      error: error.message,
    });
  }
};

export { taskDetails };
