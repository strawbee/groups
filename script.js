'use strict';

let studentsArr = ['Cara', 'Carl', 'Collin', 'Daniel', 'David', 'Dawn', 'Jennifer', 'Joanna', 'Joshua', 'Josiah', 'Kris', 'Lacy', 'Mario', 'Michael', 'Panos', 'Ryan', 'Sarah B', 'Sarah G', 'Sean', 'Wyatt', 'Zachary'];

// AngularJS application
let app = angular.module('groups', []).controller('students', function($scope, $sce) {
    $scope.students = studentsArr;
    $scope.add = function() {
        $scope.errorvalidation = '';
        if (!$scope.addStudent) return;
        if ($scope.students.indexOf($scope.addStudent) === -1) {
            $scope.students.push($scope.addStudent);
            $scope.groupmsg = '';
        }
        else $scope.errorvalidation = 'This student is already on the list.';
        $scope.addStudent = null;
    }

    $scope.remove = function(i) {
        $scope.errorvalidation = '';
        $scope.groupmsg = '';
        $scope.students.splice(i, 1);
    }

    $scope.group = function(n) {
        $scope.groupmsg = $sce.trustAsHtml(groupMe(n));
        $scope.numPerGroup = '';
    }
});

// Grouping function
function groupMe (n)   { // n is number of people per group
    n = Number(n);
    let names = studentsArr.slice();
    if (!Number.isInteger(n) || n < 1 || n > names.length) return 'invalid argument';
    let results = [], numGroups = Math.floor(names.length / n);

    for (let i = 0; i < numGroups; i++) {
        results[i] = [];
        for (let j = 0; j < n; j++) 
            results[i][j] = names.splice(Math.floor(Math.random() * names.length), 1)[0];
    }

    let i = 0;
    while (names.length) {
        if (i === results.length) i = 0;
        results[i].push(names.pop());
        i++;
    }

    let resultMsg = `<h2>[ GROUPS ]</h2>`;
    for (let i = 0; i < results.length; i++) {
        resultMsg += `<b>Group ${i + 1}</b>: ${results[i].join(', ')}<br />`
    }
    return resultMsg.trim();
};