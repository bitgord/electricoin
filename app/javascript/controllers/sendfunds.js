"use strict";
var app = angular.module("electricoinDapp");


app.controller('SendfundsController',["$scope","$http", function($scope, $http){
    $scope.accounts = web3.eth.accounts;



}]);
