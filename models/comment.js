
// let's import the Sequelize, Model, and DataTypes classes
// Sequelize class provides the main API for interacting with a database
// Model class defines a model in a sequelize app
// DataTypes object contains constants that represent the different data types supported by sequelize
const { Model, DataTypes } = require('sequelize');

// sequelize object represents the sequelize instance configured with our database connection
const sequelize = require('../config/connection.js');

// here we are going to define our own model

// init method is used to define the fields and options for the Comment model
// comment model will have a body
class Comment extends Model { }

Comment.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      modelName: 'comment'
    }
)

module.exports = Comment;

