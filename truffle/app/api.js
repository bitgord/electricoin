const Web3 = require('web3');
const web3 = new Web3(
	new Web3.providers.HttpProvider("http://localhost:8545")
);
console.log('Web3 is connected: ' + web3.isConnected());

const owner = web3.eth.accounts[0];
const consumer = web3.eth.accounts[1];
const producer = web3.eth.accounts[2];

// Load the contract artifacts
const energyMarketArtifacts = require('../build/contracts/EnergyMarket.json');

/// @dev TODO
function addStoredEnergy(account, amount) {

    loadContract(energyMarketArtifacts).then(market => {
        // Deposit new energy tokens
        return market.addStoredEnergy(producer, amount, {
            from: owner
        });

    }).then(res => {
		console.log(res);
    }).catch(error => {
		console.log(error);
    });
}

/// @dev TODO
function depositEnergyTokens(account, amount) {

    loadContract(energyMarketArtifacts).then(market => {
        // Deposit new energy tokens
        return market.depositEnergyTokens(consumer, amount, {
            from: owner
        });

    }).then(res => {
		console.log(res);
    }).catch(error => {
		console.log(error);
    });
}

/// @dev TODO
function getTokenBalance(account) {
    loadContract(energyMarketArtifacts).then(market => {
        // Deposit new energy tokens
        return market.tokenBalance.call(account);

    }).then(res => {
		console.log(res.toNumber());
    }).catch(error => {
		console.log(error);
    });
}

/// @dev TODO
function getStoredEnergy(account) {
    loadContract(energyMarketArtifacts).then(market => {
        // Deposit new energy tokens
        return market.storedEnergy.call(account);

    }).then(res => {
		console.log(res.toNumber());
    }).catch(error => {
		console.log(error);
    });
}

/// @dev TODO
function transferEnergy(producer, consumer, amount){
    loadContract(energyMarketArtifacts).then(market => {
        // Deposit new energy tokens
        return market.transferEnergy(producer, consumer, amount, {
            from: owner
        });

    }).then(res => {
		console.log(res);
    }).catch(error => {
		console.log(error);
    });
}

function createEventListener(contract, _event) {
    contract[_event]().watch(function(error, result) {
        console.log(error, result);
    })
}


/*
* Helpers
*/
/// @dev TODO
function loadContract(contractArtifacts) {
    // Detect current network in order to grab address if deployed
    return detectNetwork().then(network => {
        let address = contractArtifacts.networks[network].address;
        let abi = contractArtifacts.abi;

        return web3.eth.contract(abi).at(address);
    });
}

/// @dev TODO
function detectNetwork() {
    return new Promise((accept, reject) => {
        web3.version.getNetwork((err, res) => {
            accept(res.toString());
        });
    });
}


/*
* Test API Methods
*/
// depositEnergyTokens(web3.eth.accounts[0], 100);
// getTokenBalance(consumer);
// getTokenBalance(producer);

// addStoredEnergy(producer, 100);
// getStoredEnergy(producer);

// transferEnergy(producer, consumer, 100);
