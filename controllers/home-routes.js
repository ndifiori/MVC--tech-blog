// our home route file will hold all of our get requests for our home page 

// let's call the Router function to create a new router object that can route HTTP requests 
const router = require('express').Router();

// destructuring to import post, comment, user from our models folder
const { Post, Comment, User } = require('../models/');


// get all posts for homepage
  // find all the posts that include the user
    // postData is an array so the map method will transform each object in the array by using the get method
      // the get method will retrieve the values and return a plain javascript object
  // this will render it to the all posts handlebar and pass the post object 
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User],
    });
    console.log(typeof postData);
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get single post by the id parameter in the URL
  // this will find the post by it's primary key

    // this method will take in 2 arguments
      // 1st argument = primary key value which is the id from the parameter in the URL
      // 2nd argument = an options object that will specify related models that should be included in our query
        // this helps with retrieving data from multiple tables with a single query

          // the include options includes the User model and the comment model
            // user = include related user of post 
            // model = comment --> will include related comments for the post
              // will also include each user for the related comment

      // our result is stored in the postdata variable
        // if the postdata is found --> retrieve the plain object representation, store it in post array, and pass it to our single post handlebars
        // if postdata is not found --> end the response 
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      console.log(postData)
      const post = postData.get({ plain: true });

      res.render('single-post', { post });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


// get request method for the login but if the user is already logged in we want to redirect them to the all posts
  // the req.session is used to store information about the current user's session by express session
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// get request method for the signup endpoint
  // this get request will check if the user is logged in
  // if they are logged it will redirect them to the endpoint that will display all posts
  // if the user is NOT logged in then it will res.render a the signup handlebars template
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;





