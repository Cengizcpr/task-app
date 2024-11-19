import db from '../../models/index.js';
const Users = db.Users;
import bcrypt from 'bcryptjs';

const add = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const resultUser = await Users.findOne({ where: { user_name: user_name } });

    if (resultUser) {
      return res
        .status(400)
        .json({ message: 'User with the same user name already exists!' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdUser = await Users.create({
      user_name: user_name,
      email: email || null,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: 'User created successfully.',
      user: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user!',
      error: error.message,
    });
  }
};

export { add };
