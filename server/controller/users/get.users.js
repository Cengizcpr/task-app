import db from '../../models/index.js';
const Users = db.Users;

const usersDetails = async (req, res) => {
  try {
    const users = await Users.findAll({
      order: [['user_id', 'ASC']],
    });

    const userDetails = users.map(async (user) => {
      return {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
      };
    });

    const allUsers = await Promise.all(userDetails);

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({
      message: 'Error users details!',
      error: error.message,
    });
  }
};

export { usersDetails };
