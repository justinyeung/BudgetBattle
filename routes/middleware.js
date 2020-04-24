const express = require('express');
const router = express.Router();

//middleware
//add this to parameters if login is required for that route
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.send("Not logged in");
}

// TODO TEST ROUTE
// return logged in user
router.get('/user', (req, res) => {
    // console.log(req.session.cookie);
    // console.log(req.sessionID);
    res.send(req.session.user);
})

// TEST ROUTE
// check if logged in or not
router.get('/isLoggedIn', (req, res) => {
    if(isLoggedIn){
        res.send("Logged In");
    }else{
        res.send("Not Logged In");
    }
});

module.exports = router;