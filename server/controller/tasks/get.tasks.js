import db from '../../models/index.js';
const Tasks = db.Tasks;

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      order: [['task_id', 'ASC']],
    });

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: 'Error tasks list!',
      error: error.message,
    });
  }
};

export { getTasks };
