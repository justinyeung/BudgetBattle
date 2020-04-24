//middleware
//add this to parameters if login is required for that route
module.exports = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    console.log("Not logged in");
    next();
}
