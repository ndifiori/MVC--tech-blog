
// let's create a middleware function to check for user authentication
  
  // if the userID property is not set on the req.session THEN redirect to the login page 
  // else if the userID property is set call the next function 

const withAuth = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
