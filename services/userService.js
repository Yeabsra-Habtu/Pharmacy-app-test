const User = require('../models/User');

const registerUser = async (username, password, role) => {
  const userExists = await User.findOne({ username });

  if (userExists) {
    throw new Error('User already exists');
  }

  const user = new User({ username, password, role });
  await user.save();
  return user;
};

const loginUser = async (username, password) => {
  const user = await User.findOne({ username });

  if (!user || !(await user.matchPassword(password))) {
    throw new Error('Invalid username or password');
  }

  return user;
};

module.exports = { registerUser, loginUser };
