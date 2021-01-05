// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16 <0.8.0;

contract LaundererDetector {
    address[] private potential_launderers;
    address[] private transactors;
    address[] private hugeTransactors;
    uint[] private amountHuge;
    uint private threshold = 10**18;
    uint private maxSave = 50**18;
    event LogDepositMade(address indexed accountAddress, uint amount);
    event LogWithdrawMade(address indexed accountAddress, uint amount);
    
    function withdraw(uint256 amount) public {       
        require(address(this).balance >= amount);
        msg.sender.transfer(amount);
        transactors.push(msg.sender);

        emit LogWithdrawMade(msg.sender, amount);
    }

    function deposit() public payable {
        //require(msg.value == amount);
        transactors.push(msg.sender);

        if(msg.value > threshold){
            hugeTransactors.push(msg.sender);
            amountHuge.push(msg.value);
        }
                    
        emit LogDepositMade(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getThreshold() public view returns (uint) {
        return threshold / (1**18);
    }

    function setThreshold(uint256 newthreshold) public {
        threshold = newthreshold;
    }

    function potentialLaunderers() public  {
        if(address(this).balance > maxSave)
            potential_launderers = transactors;
        
    }
    
    function getPotentialLaunderer() public view returns (address[] memory){
        return potential_launderers;
    }
    
    function getHugeTransactors() public view returns (address[] memory, uint[] memory) {
        return (hugeTransactors, amountHuge);
    }
}