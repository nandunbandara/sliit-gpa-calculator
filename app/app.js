/**
 * Created by nandunb on 1/18/18.
 */
angular.module("gpac",[])

.controller("mainCtrl", function($scope, DataFactory){
    $scope.testMessage = "hello";

    $scope.gpa = 0;

    $scope.selectedSubjects = [];

    $scope.selectedYear = "Y1";
    $scope.selectedSemester = "S1";

    $scope.loadSubjects = function(){
        $scope.selectedSubjects = [];
        $scope.gpa = 0;

        DataFactory.getSubjects($scope.selectedYear, $scope.selectedSemester).then(function(response){
            $scope.subjects = response;
        });
    };

    $scope.loadSubjects();

    DataFactory.getGrades().then(function(response){
        $scope.grades = response.data;
    });


    $scope.addGrade = function(subject, grade){

        if(!subject || !grade){
            alert("Please select a subject and enter your grade!");
            return;
        }

        var gradeObject = {
            subject: subject,
            grade: grade
        };

        $scope.selectedSubjects.push(gradeObject);
    };

    $scope.removeGrade = function(object){
        var index = $scope.selectedSubjects.indexOf(object);

        if(index != -1){
            $scope.selectedSubjects.splice(index, 1);
        }
    };

    $scope.calculateGPA = function(){
        var totalCreditPoints = 0;
        var gradeCreditProduct = 0;
        $scope.selectedSubjects.forEach(function(item){
            gradeCreditProduct += item.subject.credits * item.grade.points;
            totalCreditPoints += item.subject.credits;
        });

        $scope.gpa = gradeCreditProduct / totalCreditPoints;
    };
})

.factory("DataFactory", function($http){
    var sub = {};

    sub.getSubjects = function(year,semester){
        return $http.get('app/data/subjects.json').then(function(data){
            console.log(data.data[year][semester]);
            return data.data[year][semester];
        })
    };

    sub.getGrades = function(){
        return $http.get('app/data/grades.json').then(function(data){
            return data;
        })
    };

    return sub;
});