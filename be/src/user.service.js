const bcrypt = require('bcryptjs');

const users = [];//wanna be db

const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

const findUserById = async (id) => {
  return users.find(user => user.id === id);
};

const createUser = async (email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

const UserService = {
  users,
  findUserByEmail,
  findUserById,
  createUser,
};
module.exports = UserService