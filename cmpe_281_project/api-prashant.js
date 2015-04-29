var express    = require("express");
var mysql      = require('mysql');
var bodyParser  = require("body-parser");
var connection = mysql.createConnection({
  host     : 'awsmysql.crotyk30ckwb.us-west-2.rds.amazonaws.com',
  user     : 'root',
  password : 'password123',
  database : 'cmpe281',
  multipleStatements: true
});
var app = express();
app.set('port', process.env.PORT || 8080);
app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});


app.post("/login", function(req, res){
//SELECT * FROM ?? WHERE ??=? and ??=?
  var queryString = "SELECT * FROM ?? WHERE ??=? LIMIT 1";
  var table = ["users","email", req.body.email];
  //var table = ["users","email",  req.body.email];
  queryString = mysql.format(queryString,table);
  connection.query(queryString,function(err,results){
      if(err) {
          res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      } else {
          res.json({"Error" : false, "Message" : "Success", "Users" : results});
      }
  });
});


app.post("/createUser", function(req, res){

  var queryString = "INSERT INTO ??(??,??,??) VALUES (?,?,?)";
  var table = ["users","user_name","email","password",req.body.user_name, req.body.email, req.body.password];
  queryString = mysql.format(queryString,table);

  connection.query(queryString, function (error,results){
    if(error){
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      //console.log(res);
      
      res.json({"Error" : false, "Message" : "{'user_id' : " +results.insertId+"}"});
    }
  });

});


app.post("/waterfall/create-project", function(req, res){
  var queryString = "INSERT INTO ??(??,??) VALUES (?,?)";
  var table = ["projects","user_id","tenant_id",req.body.user_id, req.body.tenant_id];
  queryString = mysql.format(queryString,table);

  connection.query(queryString, function (error,results){
    if(error){
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.json({"Error" : false, "Message" : "{'project_id' : " +results.insertId+"}"});
    }
  });

});

//create new tasks
//UserId, TenantId,ProjectId,TaskName,StartDate,EndDate,PercentageCompleted(100)
app.post("/waterfall/create-task", function(req, res){

  var queryString = "INSERT INTO user_data_table (user_id,field_id,field_value,tenant_id) VALUES (?),(?),(?),(?)";
  var table = [
      [req.body.user_id, req.body.field_id, req.body.task_name, req.body.tenant_id],
      [req.body.user_id, req.body.field_id, req.body.start_date, req.body.tenant_id],
      [req.body.user_id, req.body.field_id, req.body.end_date, req.body.tenant_id],
      [req.body.user_id, req.body.field_id, req.body.percentage_complete, req.body.tenant_id]
    ];
  queryString = mysql.format(queryString,table);
  connection.query(queryString, function (error,results){
    if(error){
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.json({"Error" : false, "Message" : "DONE"});
    }
  });
});



//Update the task details
app.put("/waterfall/edit-task", function(req, res){
  //update the task name
  var queryString1 = "UPDATE ?? SET ??=? WHERE ??=? and ??=? and ??=?";
  var table = ["user_data_table", "field_value", req.body.task_name, "user_id", req.body.user_id, "field_id", req.body.field_id, "tenant_id", req.body.tenant_id];
  queryString1 = mysql.format(queryString1, table);
  
  //update the start_date
  var queryString2 = "UPDATE ?? SET ??=? WHERE ??=? and ??=? and ??=?";
  var table = ["user_data_table", "field_value", req.body.start_date, "user_id", req.body.user_id, "field_id", req.body.field_id, "tenant_id", req.body.tenant_id];
  queryString2 = mysql.format(queryString2, table);

  //update the end_date
  var queryString3 = "UPDATE ?? SET ??=? WHERE ??=? and ??=? and ??=?";
  var table = ["user_data_table", "field_value", req.body.end_date, "user_id", req.body.user_id, "field_id", req.body.field_id, "tenant_id", req.body.tenant_id];
  queryString3 = mysql.format(queryString3, table);

  //update the percentage_complete
  var queryString4 = "UPDATE ?? SET ??=? WHERE ??=? and ??=? and ??=?";
  var table = ["user_data_table", "field_value", req.body.percentage_complete, "user_id", req.body.user_id, "field_id", req.body.field_id, "tenant_id", req.body.tenant_id];
  queryString4 = mysql.format(queryString4, table);
  
  var queryString = queryString1 + "; " + queryString2 + "; " + queryString3 + "; " + queryString4 + ";";  
  console.log("query String : ", queryString);

  connection.query(queryString, function (error,results){
    if(error){
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.json({"Error" : false, "Message" : "DONE"});
    }
  });
});


//view progress
app.post("/waterfall/view-progress", function(req, res){

  var queryString = "SELECT * from ?? WHERE ??=? and ??=? and ??=?";
  
  //field_id = field of the percentage_complete
  var table = ["user_data_table", "user_id", req.body.user_id, "field_id", req.body.field_id, "tenant_id", req.body.tenant_id];
  queryString = mysql.format(queryString, table);
  console.log(queryString);
  
  connection.query(queryString, function (error,results){
    if(error){
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.json({"Error" : false, "Message" : results});
    }
  });

});








