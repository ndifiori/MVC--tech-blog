
// create an index js file to set up routes for our api

// import router class from express module and create instance of Router
const router = require('express').Router();

// import routes for user routes
const userRoutes = require('./user-routes.js');

// import routes for post routes
const postRoutes = require('./post-routes');

// import routes for comment routes
const commentRoutes = require('./comment-routes');

// sets up a route for the user endpoints 
router.use('/user', userRoutes);

// sets up a route for the post endpoints
router.use('/post', postRoutes);

// sets up a route for the comment endpoints
router.use('/comment', commentRoutes);

module.exports = router;


