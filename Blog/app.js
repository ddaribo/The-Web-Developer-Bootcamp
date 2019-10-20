var express         = require("express"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    expressSanitizer=require("express-sanitizer"),
    mongoose        = require("mongoose"),
    app             = express();

/* App Config */

mongoose.connect("mongodb://localhost/restful_blog_app", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false 
 });

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

    /* Sanitizer protects content
       from potentionally harmful
       script tags, written by
       users  */
       
app.use(expressSanitizer());
app.use(methodOverride("_method"));

/* Schema Definition */

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);
/*
blog.create({
    title: "I love dogs",
    image: "https://cdn.pixabay.com/photo/2016/02/26/16/32/dog-1224267_1280.jpg",
    body: "Hello! This is my first blog post."
});
*/

/* RESTful routes */
app.get("/", function(req,res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

app.get("/blogs/new", function(req, res){
    res.render("new");
});

app.post("/blogs", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log(err);
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.get("/blogs/:id", function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            console.log(err);
            res.render("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

app.get("/blogs/:id/edit",function(req,res){
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog : foundBlog});
        }
    })
});

app.put("/blogs/:id", function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});

app.delete("/blogs/:id", function(req,res){
    Blog.findByIdAndDelete(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen("5500", "127.0.0.1", function(){
    console.log("Server is running");
});