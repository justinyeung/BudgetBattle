const express = require("express");
const router = express.Router();
const passport = require("passport");

// callback
router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/",
  }),
  function (req, res) {
    try {
      // save user to express session
      req.session.user = req.user;

      // redirect to home page
      res.redirect("http://localhost:3000/success");
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET /api/ggauth/login
// @desc log in to google route
// @access public
router.get("/login", passport.authenticate("google", { scope: ["profile"] }));

module.exports = router;
