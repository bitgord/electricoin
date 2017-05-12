pragma solidity ^0.4.6;

contract EnergyMarket {
	/*
	* Storage
	*/
	// Producer or Consumer address mapped to balance of tokens
	mapping(address=>uint) public tokenBalance;

	// Producer address mapped to the amount of stored energy
	mapping(address=>uint) public storedEnergy;

	/*
	* Events
	*/
	event AddStoredEnergy(address producer, uint amount);
	event TransferEnergy(address producer, address consumer, uint amount);

	/*
	* Public
	*/
	/// @dev New energy stored within battery as the producer
	/// @param producer the ID for this producer
	/// @param amount the amount of energy added
	function addStoredEnergy(address producer, uint amount) public {
		storedEnergy[producer] += amount;
		AddStoredEnergy(producer, amount);
	}

	/// @dev Deposit newly purchased energy tokens
	/// enabling consumers to purchase real energy units
	/// @param consumer ..
	/// @param amount ..
	function depositEnergyTokens(address consumer, uint amount) public {
		tokenBalance[consumer] += amount;
	}

	/// @dev Sell energy from a producer to a consumer
	/// transfer tokens to the producer
	/// @param producer address the energy is taken from and token allocated to
	/// @param consumer the consumer that is paying tokens for the energy
	/// @param amount the amount of energy to transfer
	function transferEnergy(address producer, address consumer, uint amount) public {
		// Check that the consumer has enough funds and producer enough energy
		if (storedEnergy[producer] < amount || tokenBalance[consumer] < amount) throw;

		// Transfer the value
		storedEnergy[producer] -= amount;
		tokenBalance[consumer] -= amount;
		tokenBalance[producer] += amount;

		TransferEnergy(producer, consumer, amount);
	}
}
