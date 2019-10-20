var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./Models/comments");

    var data = [
        {   
            name: "Salmon Creek", 
            image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970_1280.jpg" ,
            description: "Affogato helvetica pop-up hella raw denim cray, try-hard locavore art party you probably haven't heard of them whatever woke. Portland activated charcoal 3 wolf moon vaporware offal sartorial fingerstache. Kinfolk listicle seitan chillwave subway tile blog pickled prism lo-fi poke. Viral pok pok master cleanse wayfarers, leggings plaid single-origin coffee vaporware lyft blue bottle hexagon craft beer farm-to-table butcher cliche." 
        },
        {   
            name: "Granite Hill",
            image: "https://cdn.pixabay.com/photo/2016/03/09/10/37/trees-1246045_1280.jpg" ,
            description: "Affogato helvetica pop-up hella raw denim cray, try-hard locavore art party you probably haven't heard of them whatever woke. Portland activated charcoal 3 wolf moon vaporware offal sartorial fingerstache. Kinfolk listicle seitan chillwave subway tile blog pickled prism lo-fi poke. Viral pok pok master cleanse wayfarers, leggings plaid single-origin coffee vaporware lyft blue bottle hexagon craft beer farm-to-table butcher cliche." 
        },
        {   
            name: "Mountain Goat's Rest", 
            image: "https://cdn.pixabay.com/photo/2015/08/19/16/00/campfire-896196_1280.jpg",
            description: "Affogato helvetica pop-up hella raw denim cray, try-hard locavore art party you probably haven't heard of them whatever woke. Portland activated charcoal 3 wolf moon vaporware offal sartorial fingerstache. Kinfolk listicle seitan chillwave subway tile blog pickled prism lo-fi poke. Viral pok pok master cleanse wayfarers, leggings plaid single-origin coffee vaporware lyft blue bottle hexagon craft beer farm-to-table butcher cliche." 
        },
        {   
            name: "Light House Resort",
            image: "https://cdn.pixabay.com/photo/2016/03/09/12/06/night-sky-1246279_1280.jpg" ,
            description: "Affogato helvetica pop-up hella raw denim cray, try-hard locavore art party you probably haven't heard of them whatever woke. Portland activated charcoal 3 wolf moon vaporware offal sartorial fingerstache. Kinfolk listicle seitan chillwave subway tile blog pickled prism lo-fi poke. Viral pok pok master cleanse wayfarers, leggings plaid single-origin coffee vaporware lyft blue bottle hexagon craft beer farm-to-table butcher cliche." 
        },
        {   
            name: "Paradise Beach", 
            image: "https://cdn.pixabay.com/photo/2016/09/05/12/48/camping-1646504_1280.jpg",
            description: "Affogato helvetica pop-up hella raw denim cray, try-hard locavore art party you probably haven't heard of them whatever woke. Portland activated charcoal 3 wolf moon vaporware offal sartorial fingerstache. Kinfolk listicle seitan chillwave subway tile blog pickled prism lo-fi poke. Viral pok pok master cleanse wayfarers, leggings plaid single-origin coffee vaporware lyft blue bottle hexagon craft beer farm-to-table butcher cliche." 
        },
    ]

function seedDb(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err);
        } else {
                console.log("removed campgrounds");
                //add a few camps
                data.forEach(function(seed){
                Campground.create(seed, function(err,campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added data");
                        //create comment
                        Comment.create(
                        { 
                            text: "This place is great, but I wish there was Internet",
                            author:"Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created new comment");
                            }
                        });
                    }
                });
            });
        }
    });  
}

module.exports = seedDb;
