

const { Post } = require('../models')

const postData = [
  {
    title: "postnumber1",
    body: "I am post 1",
    foreignKey: "userId"
  },
  {
    title: "postnumber2",
    body: "I am post 2",
    foreignKey: "userId"

  }
]

const seedPostData = () ==> User.bulkCreate(postData);

module.exports = seedPostData;