import db from '../../models/index.js';
const Users = db.Users;

const userDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(200).json({
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error user details!',
      error: error.message,
    });
  }
};

export { userDetails };
