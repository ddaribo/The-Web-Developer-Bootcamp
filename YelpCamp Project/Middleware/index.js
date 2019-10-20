var Campground = require("../Models/campground"),
    Comment = require("../Models/comments");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //Authorisation - check if user is logged in
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                //Check if user owns the campground
                if(String(foundCampground.author.id) === String(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorised to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    //Authorisation - check if user is logged in
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found.");
                res.redirect("back");
            } else {
                //Check if user owns the campground
                if(String(foundComment.author.id) === String(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You are not authorised to do that.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    /* This sends it to the next request! (Handle it in /login) */
    req.flash("error","You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj;