import db from '../../models/index.js';
const Tasks = db.Tasks;
const remove = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Tasks.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found!' });
    }

    await task.destroy();

    return res.status(200).json({
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error deleting task!',
      error: error.message,
    });
  }
};
export { remove };
