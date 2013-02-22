/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.use(express.cookieParser());
app.use(express.session({ secret: process.env.SECRET || 'fake_secret'}));
app.use(app.router);

//list page
//let's change it into the page with the image and the phrase
app.get('/', routes.index);
app.get('/cats', user.list);

//make a new cat
//this will be the page to make the card
app.get('/cats/new', user.new);
app.post('/cats/new', user.addcat);//user posts the data here

//app.get('/cats/:name', user.addcat);
//app.post('/cats/:name', user.list2);

//sorts the color of the cat
//app.get('/cats/color/:color', user.colorcat);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});