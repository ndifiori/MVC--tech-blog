

// let's import the user post comment modules
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

// let's define relationships between models

// user can have many posts 
  // the posts model will have a FK of userId
User.hasMany(Post, {
  foreignKey: 'user_id',
})

// post belongs to User table with a FK of userid
  // so when a user is delete so are all their posts
Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// post can have many comments 
  // the comments model has a FK of postID 
  // so when a post is deleted so are the comments 
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// comment belongs to user with a foreign key of userID
  // so when a user is deleted so are their posts
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'user_comment_id',
  onDelete: 'CASCADE'
})

module.exports = {
  User,
  Post,
  Comment
};