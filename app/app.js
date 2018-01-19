/**
 * Created by nandunb on 1/18/18.
 */
angular.module("gpac",[])

.controller("mainCtrl", function($scope, DataFactory){
    $scope.testMessage = "hello";

    $scope.gpa = 0;

    $scope.selectedSubjects = [];

    DataFactory.getSubjects(1,1).then(function(response){
        $scope.subjects = response.data.Y1.S1;
    });

    DataFactory.getGrades().then(function(response){
        $scope.grades = response.data;
    });


    $scope.addGrade = function(subject, grade){

        var gradeObject = {
            subject: subject,
            grade: grade
        };

        $scope.selectedSubjects.push(gradeObject);
    }

    $scope.calculateGPA = function(){
        var totalCreditPoints = 0;
        var gradeCreditProduct = 0;
        $scope.selectedSubjects.forEach(function(item){
            gradeCreditProduct += item.subject.credits * item.grade.points;
            totalCreditPoints += item.subject.credits;
        });

        $scope.gpa = gradeCreditProduct / totalCreditPoints;

    }
})

.factory("DataFactory", function($http){
    var sub = {};

    sub.getSubjects = function(year,semester){
        return $http.get('app/data/subjects.json').then(function(data){
            console.log(data);
            return data;
        })
    };

    sub.getGrades = function(){
        return $http.get('app/data/grades.json').then(function(data){
            return data;
        })
    };

    return sub;
});