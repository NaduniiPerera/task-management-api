let users = [];
let nextUserId = 1;

function getAllUsers() {
  return users;
}

function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}

function createUser(userData) {
  const newUser = {
    id: nextUserId++,
    name: userData.name,
    email: userData.email,
    password: userData.password,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  return newUser;
}

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
};