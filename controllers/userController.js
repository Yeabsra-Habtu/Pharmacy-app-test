const userService = require('../services/userService');

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await userService.registerUser(username, password, role);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userService.loginUser(username, password);
    req.session.userId = user._id; 
    res.json({ message: 'User logged in', user });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Could not log out, please try again' });
    }
    res.json({ message: 'Logged out' });
  });
};

module.exports = { register, login, logout };
