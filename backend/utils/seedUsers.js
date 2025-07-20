const User = require('../models/users');

const addTestUser = async () => {
  try {
    const user = new User({ name: 'Sahil', email: 'sahil@12.com' ,password:"1234"});
    await user.save();
    console.log('Sample user inserted');
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
};

module.exports = addTestUser;
