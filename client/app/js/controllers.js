var App = angular.module('myApp',['services','directives']);

App.controller('getdata', ['$scope', 'socket', function($scope, data){
	$scope.myobj = data;
}]);




