
// we need to import the router function 
const router = require('express').Router();

// destructuring to bring in the user model
const { User } = require('../../models/');


// post request for the / endpoint for the user routes to create a new user in the user model

  // .create() method will create a new user 
    // the newUser will have a username and password by utilizing the req.body

  // the req.session.save() method will save the session
    // pass a callback function to this method that will run after the session is saved
      // req.session.userId sets the userId of the session to the id of the newUser
      // req.session.username sets the username of the session to the newUser
      // req.session.loggedIn sets the loggedIn field of the session to true
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// post request for the /login endpoint

  // then we will find the user by the findOne() method where the req.body.username matches the usernmae in the user table
    // if there is no user --> send the client a message

  // next let's check to see if the req.body.password matches the stored password by calling the checkPassword() method
    // if the password is not valid --> send the client a message

  // follow what we did with the / endpoint that creates a session and stores the id, username, and loggedIn boolean 

  // now we return a res.json to the client that has our user object and the message they are logged in
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});


// post request for the /logout endpoint
  // if the req.session.loggedIn boolean is true
    // use the destroy() method to end the session
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;