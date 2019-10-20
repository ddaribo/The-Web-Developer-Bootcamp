
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var uri = "mongodb://localhost/cats";

mongoose
    .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error:", err.message);
    });


var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

/*var george = new Cat({
   name: "Georgiana",
   age: 11,
   temperament: "Grouchy"
});*/


/*george.save(function(err, cat){
    if(err){
        console.log("sth went wrong");
    } else{
        console.log("saved a cat to db");
        console.log(cat);
    }
});*/

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log("DB Connection Error:", err.message);
    } else {
        console.log("New cat:");
        console.log(cat);
        console.log("---------");
    }
});

Cat.find({}, function(err, cats){
    if(err){
        console.log("DB Connection Error:", err.message);
    } else {
        console.log(cats);
    }
});
