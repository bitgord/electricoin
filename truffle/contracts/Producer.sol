pragma solidity ^0.4.6;

import './Consumer.sol';

contract Producer {
	uint public tokenBalance;
	uint public storedEnergy;

	event StoredEnergyUpdated(uint amount, uint total);

	function updateStoredEnergy(uint amount) returns(bool sufficient) {
		storedEnergy += amount;
		StoredEnergyUpdated(amount, storedEnergy);
	}

	function sellEnergy(uint amount, address to) {
		// Check that the consumer has enough funds
		Consumer consumer = Consumer(to);
		if (amount < consumer.tokenBalance()) throw;

		
	}
}
