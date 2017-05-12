var Producer = artifacts.require('./Producer.sol');
var Consumer = artifacts.require('./Consumer.sol');

contract('Producer', function(accounts) {
    let producer, consumer;

    it('tokenBalance should return the balanace', function() {
        return Producer.new().then(function(producer) {
            return producer.tokenBalance.call();

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'empty contract balance was not 0');
        });
    });

    it('storedEnergy should return the balanace', function() {
        return Producer.new().then(function(producer) {
            return producer.storedEnergy.call();

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'empty contract balance was not 0');
        });
    });


    it('updateStoredEnergy should update the value', function() {
        return Producer.new().then(function(_producer) {
            producer = _producer;
            return producer.updateStoredEnergy(10);

        }).then(function(tx) {
            return producer.storedEnergy.call()

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 10, 'storedEnergy was not updated');
        });
    });
});
