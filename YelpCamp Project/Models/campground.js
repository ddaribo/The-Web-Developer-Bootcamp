var mongoose = require("mongoose");

//SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    {
        name: "Mountain Goat's Rest", 
        image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg",
        description: "This is a huge granite hill, vintage atmosphere."
    }, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log("Newly created camp");
            console.log(campground);
        }
    });*/

/*var campgrounds = [
    {name: "Salmon Creek", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Granite Hill", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Salmon Creek", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Granite Hill", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Salmon Creek", image: "https://pixabay.com/get/57e8d1454b56ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Granite Hill", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
    {name: "Mountain Goat's Rest", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c722f7fd6914bc45e_340.jpg" },
]*/

module.exports = mongoose.model("Campground", campgroundSchema);