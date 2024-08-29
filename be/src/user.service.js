
const users = [{
    email: 'ion@gmail.com',
    password: 'password',
    id: 1,
}];//wannabe db

const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

const findUserById = async (id) => {
  return users.find(user => user.id === id);
};

const createUser = async (email, password) => {
  users.push({ email, password, id: users.length + 1 });
  //console.log('---------------------------------', users[users.length - 1]);
  return users[users.length - 1]
};

const UserService = {
  users,
  findUserByEmail,
  findUserById,
  createUser,
};
module.exports = UserService