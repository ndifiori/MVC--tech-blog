require('dotenv').config();

// path is a module that provides utilities for working with file and directory paths
const path = require('path');

// express is a module that makes it easier to deploy web applications, such as routing, middleware, and templating
const express = require('express');

// express-session that allows us to store session data on the server
  // creates a new session that each user that visits the app
  // client is given a session ID cookie that persists across requests
const session = require('express-session');

// express-handlebars is a view engine for express that allows us to use the Handlebars templating language to render dynamic HTML pages
const exphbs = require('express-handlebars');

const routes = require('./controllers/');

// require the model that established our database connection
const sequelize = require('./config/connection');

// SequelizeStore is a constructor function that will allow us to store express-session (above) 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// helpers are functions that allow us to perform common tasks in our HB templates 
const helpers = require('./utils/helpers');

// app is an instance of the express application
const app = express();

// PORT specifies the port number on which the express app should listen for incoming requests
const PORT = process.env.PORT || 3001;

// sess is an object that contains configuration options for the session middleware 
  // it specifies how the session should be stored and managed by the server.
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// this passes our configurations into our express-session that our application will use
app.use(session(sess));

// creates an instance of our handlebars and defines the helpers we will be using
const hbs = exphbs.create({ helpers });

// app.engine method registers the express-handlebars template engine as the engine for files with the .handlebars extension
// app.set method sets the view engine property of the app to handlebars, telling the app to use the express-handlebars engine to render views
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views')

// parses the request body if it contains JSON data and makes it available in the request.body property
// parses the request body if it contains URL-encoded data and makes it available in the request.body property
// serves files from the public directory located in the same directory as the script
// tells us to use our controllers module that defines our routes for our application
// app.listen will tell our application which port to listen to
  // force false method will only create tables that do not already exist
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
});