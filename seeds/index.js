const sequelize = require('../config/connection.js');
const seedUsers = require('./userSeed');
const seedPosts = require('./postSeed');
const seedComments = require('./commentSeed');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n-----DATABASE SYNCED-----\n');

  await seedUsers();
  console.log('\n-----SAMPLE USERS SEEDED-----\n');

  await seedPosts();
  console.log('\n-----SAMPLE POST SEEDED-----\n');

  await seedComments();
  console.log('\n-----SAMPLE COMMENTS SEEDED-----\n');

  process.exit(0);
}

seedAll();