
const users = [{
    email: 'ion@gmail.com',
    password: 'password',
    id: 1,
    userType: 0
}, {
    email: 'stana.andrei.2003@gmail.com',
    password: 'password',
    id: 2,
    userType: 0
}];//wannabe db

const findUserByEmail = async (email) => {
  return users.find(user => user.email === email);
};

const findUserById = async (id) => {
  return users.find(user => user.id === id);
};

const createUser = async ({email, password, userType}) => {
  users.push({ email, password, id: users.length + 1, userType });
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