
// let's follow the same format as the comment.js file 

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

// post model will have a title and body
class Post extends Model { }

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
    {
      sequelize,
      timestamps: true,
      freezeTableName: true,
      modelName: 'post'
    }
  )
    module.exports = Post;
    
