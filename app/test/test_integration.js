var Producer = artifacts.require('./Producer.sol');
var Consumer = artifacts.require('./Consumer.sol');

contract('Producer', function(accounts) {
    let producer, consumer, consumerAddress;
    const energyAmount = 10;

    it('sellEnergy should update the consumer and prodcuer values', function() {
        // Deploy and fund consumer
        return Consumer.new().then(function(_consumer){
            consumer = _consumer;
            consumerAddress = _consumer.address;
            return consumer.depositTokens(energyAmount);

        // Deploy the producer
        }).then(function() {
            return Producer.new()

        // Add stored energy
        }).then(function(_producer) {
            producer = _producer;
            return producer.updateStoredEnergy(10);

        // Sell the energy
        }).then(function() {
            return producer.sellEnergy(energyAmount, consumerAddress);

        // Confirm stored energy released
        }).then(function() {
            return producer.storedEnergy.call();

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'storedEnergy was not allocated');

        // Confirm consumer tokens transferred
        }).then(function(tx) {
            return consumer.tokenBalance.call();

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'storedEnergy was not allocated');
        });
    });
});
