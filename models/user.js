
// follow similar stucture as post and comment js files
const { Model, DataTypes } = require('sequelize');

// bcrypt module provides a way to hash passwords and verify password hashes
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// let's create our user model
class User extends Model {

  // this function will take in a parameter that is a login password and compared it to a stored password 
    // when a user logs in or signs up their password is hashed and compared to the stored password in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// the user model has an id that is the primary key, a username, and a password
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // let's create a hook which in this case will run before and after a specific event in our model 
    hooks: {
      // the beforeCreate hook will be run before a new user is created 
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // the beforeUpdate hook will be run before an existing user's data is updated 
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

module.exports = User;


