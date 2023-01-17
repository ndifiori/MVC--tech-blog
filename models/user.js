
// follow similar stucture as post and comment js files
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// bcrypt module provides a way to hash passwords and verify password hashes
const bcrypt = require('bcrypt');

// let's create our user model
  // check password function will take in a parameter that is a login password and compared it to a stored password 
  // when a user logs in or signs up their password is hashed and compared to the stored password in the database

  // the user model has a username and a password
    // let's create a hook which in this case will run before and after a specific event in our model 
    // the beforeCreate hook will be run before a new user is created 
    // the beforeUpdate hook will be run before an existing user's data is updated 
    
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
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
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
)

module.exports = User;


