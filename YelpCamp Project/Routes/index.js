var express     = require("express"),
    router      = express.Router(),
    Passport    = require("passport"),
    User        = require("../Models/user");

/* Root Route */
router.get("/", function(req,res){
    res.render("landing");
});

/*  Show Register From Route */
router.get("/register", function(req,res){
    res.render("register");
});

/* Handle Register Logic Route */
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        Passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp, "+ user.username + "!");
        res.redirect("/campgrounds");
        });
    });
});

/* LogIn Route */
router.get("/login", function(req,res){
    res.render("login");
});

/* Handle LogIn Logic Route */
router.post("/login", Passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "login"
    }), function(req,res){
        req.flash("success", "Successfully logged in.");
});

/* LogOut Route */
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success", "You have been logged out.");
    res.redirect("/campgrounds");
});

module.exports = router;