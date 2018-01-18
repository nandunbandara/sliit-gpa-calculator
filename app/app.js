/**
 * Created by nandunb on 1/18/18.
 */
angular.module("gpac",[])

.controller("mainCtrl", function($scope){
    $scope.testMessage = "hello";
})

.factory("SubjectFactory", function(){
    var sub = {};

    sub.getSubjects = function(year,semester){

    };
})