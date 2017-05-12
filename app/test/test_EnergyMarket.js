var EnergyMarket = artifacts.require('./EnergyMarket.sol');

contract('EnergyMarket', function(accounts) {
    // let producer, consumer, consumerAddress;
    const energyAmount = 10;
    let energyMarket;
    let producer = accounts[0];
    let consumer = accounts[1];

    it('Energy Market should transfer energy and tokens', function() {
        // Deploy and fund consumer
        return EnergyMarket.new().then(function(_energyMarket) {
            energyMarket = _energyMarket;
            // Add tokens for a consumer to purchase energy
            return energyMarket.depositEnergyTokens(consumer, energyAmount);

        // Add energy as a producer
        }).then(function() {
            return energyMarket.addStoredEnergy(producer, energyAmount);

        // Transfer energy to the consumer
        }).then(function() {
            return energyMarket.transferEnergy(producer, consumer, 10);

        // Confirm consumer tokens transferred
        }).then(function(tx) {
            return energyMarket.tokenBalance.call(consumer);

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'tokens were not allocated');
            return energyMarket.storedEnergy.call(producer);

        }).then(function(balance) {
            assert.equal(balance.valueOf(), 0, 'storedEnergy was not allocated');
        });
    });
});
