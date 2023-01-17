
const { User } = require('../models')

const userData = [
  {
    username: 'spongebob',
    password: 'patrick'
  },
  {
    username: 'sheldon',
    password: 'cooper'
  }
]

const seedUserData = () => User.bulkCreate(userData);

module.exports = seedUserData;
