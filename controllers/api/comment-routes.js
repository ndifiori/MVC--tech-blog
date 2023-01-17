
// we need to import the router function 
const router = require('express').Router();

// destructuring to bring in the comment model
const { Comment } = require('../../models/');

// require the authenticaiton middlware we created to check for user authentication
const withAuth = require('../../utils/auth');


// create a post request for the / endpoint to create a new comment in the comment table
  // it passes the withAuth middleware to check for user authentication

  // use the create() method to insert a new row into our comment table with the data from the request body and the associated userID 
    // we use the spread operator to incude all of the data from the req.body

  // then we use the res.json() method to convert our object to a JSON to send to the client
router.post('/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_comment_id: req.session.userId,
      post_id: req.body.postId
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;




