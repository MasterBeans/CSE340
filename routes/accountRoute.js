// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController.js")

// GET route for login view
router.get('/login', accountController.buildLogin); // '/login' part of the path, not '/account/login'

// GET route for registration view
router.get('/register', accountController.buildRegister); 

// Error handler middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

// Export the router
module.exports = router;