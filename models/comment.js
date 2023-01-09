
// let's import the Sequelize, Model, and DataTypes classes
  // Sequelize class provides the main API for interacting with a database
  // Model class defines a model in a sequelize app
  // DataTypes object contains constants that represent the different data types supported by sequelize
const { Sequelize, Model, DataTypes } = require('sequelize');

// sequelize object represents the sequelize instance configured with our database connection
const sequelize = require('../config/config');

// here we are going to define our own model
class Comment extends Model {}

// init method is used to define the fields and options for the Comment model
  // comment model will have a body
Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;

