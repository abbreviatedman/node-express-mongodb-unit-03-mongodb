// 6a. Import the User model
const User = require("./usersModel");

// 6b. Write functionality to create a user
async function createUser(userData) {
  try {
    const newUser = await User.create(userData);

    return newUser;
  } catch (error) {
    // Throw error back up to the code that called this function.
    throw error;
  }
}

// 6c. Export controller functions
module.exports = {
  createUser,
};
