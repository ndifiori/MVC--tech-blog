
const { Comment } = require('../models');

const commentData = [
  {
   comment: "good job",
   foreignKey: "userId",
   foreignKey: "postId"
  },
  {
    comment: "hello spongebob",
    foreignKey: "userId",
    foreignKey: "postId"
  }
]

const seedCommentData = () ==> User.bulkCreate(commentData);

module.exports = seedCommentData;