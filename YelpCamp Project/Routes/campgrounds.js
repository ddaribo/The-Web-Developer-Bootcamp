var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Campground = require("../Models/campground"),
    middleware = require("../Middleware");

mongoose.ObjectId.get(v => v.toString());

/* 
    Index Route - show all campgrounds
*/
router.get("/", function(req, res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", 
            {
                campgrounds: allcampgrounds,
            });
        }
    });
});

/* 
    Create Route - add new campground to DB
*/
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { 
        name: name, 
        image: image, 
        description: desc, 
        price: price,
        author: author 
    };
    Campground.create(newCampground, function(err, newCampground){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

/* 
    New Route - show form to create new campground 
*/
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

/* 
    Show Route - shows more info about a single campground
*/
router.get("/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

/* Edit campground route */
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", 
        {
            campground: foundCampground
        });
    });
});

/* Update camground route */

router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndUpdate(
        req.params.id,
        req.body.campground,
        function(err, updatedCampground){
            res.redirect("/campgrounds/" + req.params.id);
    });
});

/* Destroy campground route*/
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/campgrounds");
    });
});

module.exports = router;