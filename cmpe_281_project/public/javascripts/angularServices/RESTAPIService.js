/**
 * Created by brengarajulu on 4/23/2015.
 */
//All Mongo interactions should come here
angular.module('polls').factory('angService', function () {
    var data={};
    data.CreateProject=function(){
        alert("task created");

    }
    data.CreateResource=function(){
        alert("task created");

    }

    data.CreateTask=function(){
        alert("task created");

    }
    data.ViewTasks=function(){
        alert("task created");

    }
    return data;
});