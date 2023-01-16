// our dashboard route file will hold all of our get requests for our user if they are signed in

// let's call the Router function to create a new router object that can route HTTP requests 
const router = require('express').Router();

// destructuring to import post from our models folder
const { Post } = require('../models/');

// let's bring in our middleware that checks for user authentication
const withAuth = require('../utils/auth');


// get request method for our main dashboard endpoint
  // but before it will run the callback function it will check for user authentication

  // we need to find all the posts from the post table where the userID of the post to the userID that is stored in the express session

  // run the maps method on the postdata array and return each object in the array as a javascript object and returning an array to the constant post

  // now we render our handlebars all posts admin template with the data we queried
    // once that data is rendered in our handlebars post admin template we will rende that entire template into the body of the dashboard layout

  // if the error occurs redirect the user to the login page
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});


// create a get request for the /new endpoint that uses the withAuth middleware to check for user authentication
  // if the user is authenticated let's render a new post handlebar template 
    // our new post handlebar template will then be placed into our dashboard layout
router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});


// get request for our edit/:id endpoint
  // this endpoint uses a withAuth middleware to check for user authentication before running the callback fxn

  // we are going to get the post by our id parameter in the URL
  // if the there is postData, return the object as a plain javascript object and assign it to the constant post
  // render the queried result into the edit post handlebar template
    // this will then get passed into the dashboard layout

  // if there is an error, the user will be redirected to the login endpoint
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
