var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose= require('mongoose');
var routes = require('./routes');
var users = require('./routes/users');
var http = require('http');
var path = require('path');
routes.index=require('./routes/index')

var app = express();



// Database
mongoose.connect('mongodb://root:root@ds053607.mongolab.com:53607/cmpe281');

var Schema = mongoose.Schema;
var FieldSchema = new Schema({ fieldId: Number, fieldName: String});
var Tenant = new Schema({
    tenantid: { type: Number, required: true },
    description: { type: String, required: true },
    fields: [FieldSchema],
    created: { type: Date, default: Date.now }
},{ collection: 'Tenant_Fields' });

var TenantModel=mongoose.model('Tenant',Tenant);

//Reads the tenant fields
app.get('/api/tenant/:id', function (req, res){
    console.log("got hit");
    return TenantModel.find({'tenantid':req.params.id},function (err, tenant) {
        if (!err) {
            console.log(tenant)
            return res.send(tenant);
        } else {
            return console.log(err);
        }
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));



// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'views')));

app.use('/', routes);
app.use('/users', users);
//app.use('/public/partialviews', express.static(__dirname + '/public/partialviews'));
app.use(express.static(path.join(__dirname, 'public/angularHTMLPartials')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));

/****newly added */
// Main App Page
//app.get('/', routes.index);

// MongoDB API Routes
app.get('/index', routes.index);
app.get('/polls', function(req,res)
{
 res.render('partials/list')
});


app.get('/models/model/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

// Handle /Models
app.get('/models/:name', function (req, res) {
    var name = req.params.name;
    res.render(name);
});


app.get('/ang/:partial', function (req, res){
    var partial = req.params.partial+".html"
    console.log("hit the route");
    res.sendFile(path.join(__dirname, '/public/angularHTMLPartials/'+partial));

});

app.get('/public/data/:partial', function (req, res){
    var partial = req.params.partial+".tsv"
    console.log("hit the route");
    res.sendFile(path.join(__dirname, '/public/images/'+partial));

});
/****newly added */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//Create user API

app.get('*', routes.index);
module.exports = app;
