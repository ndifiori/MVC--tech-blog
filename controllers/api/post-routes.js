
// we need to import the router function 
const router = require('express').Router();

// destructuring to bring in the post model
const { Post } = require('../../models/');

// require the authenticaiton middlware we created to check for user authentication
const withAuth = require('../../utils/auth');


// post request to the '/' endpoint for the post routes
  // uses the withAuth middleware to check for user authentication

  // create a variable for the req.body (an object) so that we can use it later to pass into the .create() method
  // then we use .create() method to insert a new row into our post table
    // we will pass the req.body and the userID as the data for the row

  // once we create the new post we use the res.json to return a json response to the client
router.post('/', withAuth, async (req, res) => {
  try {
    const body = req.body;
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});


// put request for the post routes endpoint that specifies the post ID by the URL parameter
  // uses the withAuth middleware to check for user authentication

  // the update() method to update a row in the post table with the data from our req.body where our id from the URL parameter matches the id of the post
    // this will return an array of the number of affected rows 
      // if the number is > 0 send an okay status code
      // else send a not found status code (post is not there to update)
router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = req.body
    const [affectedRows] = await Post.update(post, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete request for the post route with the id parameter in the url as the endpoint
    // uses the withAuth middleware to check for user authentication

    // let's use the .destroy() method to delete a row from the post table where the id of the post matches the id parameter in the URL
      // this will return an array
        // if the affected rows > 0 send a status code of 200 
        // else return a status code of 500 
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
