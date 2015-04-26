'use strict';

/**
 * @ngdoc function
 * @name yeomanAngularApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yeomanAngularApp
 */
// Managing the poll list

angular.module('polls',  ['ngTouch', 'ui.grid','ui.grid.edit', 'ui.grid.rowEdit', 'ui.grid.cellNav'], function () {

}).controller('WaterfallCtrl', function ($scope,angService) {


    $scope.project=
    {
        "projectName":$scope.projectName,
        "startDate":$scope.startDate,
        "endDate":"01/01/2016"

    };


    $scope.createTask= function()
    {

        var task=angService.CreateTask();

    }

    $scope.createResource= function()
    {
        alert("Resource created");

    }

    $scope.createProject= function()
    {

        alert("Project created"+JSON.stringify($scope.project));

    }

    $scope.viewTasks= function()
    {
        alert("Project created");

    }

    $scope.viewProgress= function()
    {
        alert("Project created");

    }



    $scope.tasks = [
        {
            text: "Task1"
        }, {
            text: "Task2"
        }
    ]

    $scope.myData = [
        {
            "Task": "Create new Screen",
            "Startdate": "01/01/2015",
            "EndDate": "03/01/2015",
            "% Completed":"30%",
            "Status": "In-Progress"
        },

    ];

    $scope.showalert = function()
    {
        alert("hellow")

    };
    //$scope.poll = {};
    $scope.vote = function() {};
    //$scope.polls = [];
})

.controller('KanbanCtrl', function ($scope) {

        $scope.poll = {};
        $scope.vote = function() {};
})

.controller('ScrumCtrl', function ($scope) {

        $scope.poll = {
            question: '',
            choices: [{ text: '' }, { text: '' }, { text: '' }]
        };
        $scope.addChoice = function() {
            $scope.poll.choices.push({ text: '' });
        };
        $scope.createPoll = function() {};
})



