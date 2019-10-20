var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../Models/campground"),
    Comment     = require("../Models/comments"),
    middleware = require("../Middleware");

/*
    Comments New
*/ 
router.get("/new", middleware.isLoggedIn, 
function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", { campground: campground });
        }
    });
});

/* Comments Create */ 
router.post("/", middleware.isLoggedIn, 
function(req,res){
    Campground.findById(req.params.id,
        function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                    //res.redirect("/campgrounds/:id/comments/new");
                } else {
                    /*
                        Here we pass comment as a ready object
                        because of the form (comments/new.ejs)
                        input name attributes, namely comment[text]
                        and comment[author]
                    */
                   //Add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //Save comment
                   comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

/*
    Comments Edit Route
*/ 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       res.render("comments/edit", 
        {
            campground_id: req.params.id,
            comment: foundComment
        });
        
    });
});

/*
    Comments Update Route
*/ 
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(
        req.params.comment_id,
        req.body.comment,
        function(err, updatedComment){
            if(err){
                res.redirect("back");
            } else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
});

/*
    Comments Destroy Route
*/ 
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else { 
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;