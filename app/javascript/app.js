"use strict";

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

var app = angular.module("electricoinDapp", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'views/main.html',
    templateUrl: 'views/events.html',
    controller: 'DashboardController'
  }).otherwise({redirectTo: '/'});
});