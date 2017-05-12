var app = angular.module("electricoinDapp");

app.controller("MainController", function ($scope) {

    EnergyMarket.deployed().then(function(contract) {
        $scope.accounts = web3.eth.accounts;
        $scope.balanceInEther = web3.fromWei(web3.eth.getBalance(contract.address).toNumber(), "ether");

        $scope.contract_address = contract.address;
        $scope.contract_abi = JSON.stringify(contract.contract.abi);

        $scope.accounts = [];
        
    });

});