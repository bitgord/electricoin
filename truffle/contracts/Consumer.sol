pragma solidity ^0.4.6;

import './Producer.sol';

contract Consumer {
	uint public tokenBalance;

    event Transfer(address from, address to, uint amount);

    /// @dev Deposit newly purchased tokens
    function depositTokens(uint amount) public {
        tokenBalance += amount;
    }

    /// @dev transfer tokens in exchange for energy
	function transfer(uint amount, address to)
        public
        returns(bool sufficient)
    {
		if (tokenBalance < amount) return false;
		tokenBalance -= amount;
		/*Transfer(msg.sender, receiver, amount);*/
		return true;
	}
}
