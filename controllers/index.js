
// we need to create an index js file to set up routes for our application

// import router class from express module and create instance of Router
const router = require('express').Router();

// import routes for homeroute enpoints --> routes defined in the file located in ./home-routes
const homeRoutes = require('./home-routes.js');

// import routes for dashboard enpoints --> routes defined in the file located in ./dashboard-routes
const dashboardRoutes = require('./dashboard-routes');

// import routes for API endpont --> routes defined in the file located in the ./api
const apiRoutes = require('./api');

// sets up a route for the home endpoint --> use the homeRoutes when the base path is / is requested
// sets up a route for the dashboard endpoint --> use the dashboardRoutes when the base path is /dashboard is requested
// sets up a route for the api endpoint --> use the apiRoutes when the base path is /api is requested

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;




