var express             = require("express"),
    request             = require("request"),
    app                 = express(),
    bodyParser          = require('body-parser'),
    mongoose            = require('mongoose'),
    methodOverride      = require("method-override"),
    Campground          = require("./Models/campground"),
    //seedDb              = require("./seeds");
    Comment             = require("./Models/comments"),
    flash               = require("connect-flash"),
    Passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    User                = require("./Models/user");

//seedDb();     //seed the DB
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

/* Requiring routes */
var commentRoutes       = require("./Routes/comments"),
    campgroundRoutes    = require("./Routes/campgrounds"),
    indexRoutes         = require("./Routes/index");

var uri = "mongodb://localhost/yelp_camp";

mongoose
    .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error:", err.message);
    });

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Secret text.",
    resave: false,
    saveUninitialized: false
}));

app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen("5500", "127.0.0.1", function(){
    console.log("Listening");
});