
/*
 * GET users listing.
 */

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'localhost');

var schema = mongoose.Schema({ phrase: String, disease: String, age: Number, name: String }); //make sure the name is a string
var Cat = mongoose.model('Cat', schema);

exports.list = function(req, res){
  Cat.find({}, function(err, db_cats) {
    if(err) {console.log("oh my, what a Cat-astrophe. Something is wrong.")}
    res.render('user', {
       users: db_cats,
       title: 'Cat Directory'
    });
  });
};


exports.new = function(req, res){ //calls catlist jade file with title add-a-cat. Takes the info from the catlist.
  res.render('catlist', {
  title: 'Add-a-Cat'});
};

exports.addcat = function(req, res){ //from app.js to add a cat into the list
  Cat.find({}, function(err, db_cats) {
    oldcat = db_cats[db_cats.length-1];
    Cat.remove({_id: oldcat._id}, function(err){
      if(err) console.log("oh  my, what a Cat-astrophe. Something is wrong.");       
    }); 
  });
  var age = Math.floor(Math.random()*10);
  var name = 'none';
  var disease = req.body.disease;
  var phrase = req.body.phrase;
  var phrase1 = req.body.phrase1;
  var catness = new Cat({phrase: phrase, phrase1: phrase1, disease: disease, age: age, name: name}); //new cat element 
  catness.save(function (err) {
    if (err)
      console.log("oh my, what a Cat-astrophe. Something is wrong.", err);
  }); //sends the cat (catness) to the database.
  catness.name = catness._id;
  //res.redirect('/cats/'+catness._id)
  res.redirect('/cats')
}


