// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16 <0.8.0;

contract LaundererDetector {
    address[] private potential_launderers;
    address[] private transactors;
    address[] private hugeTransactors;
    uint[] private amountHuge;
    uint private threshold = 10**18;
    uint private maxSave = 50**18;
    uint accBalance;
    event LogDepositMade(address indexed accountAddress, uint amount);
    event LogWithdrawMade(address indexed accountAddress, uint amount);
    
    address bankNegara;
    
    modifier onlyBankNegara(){
        require(msg.sender == bankNegara);
        _;
    }
    
    constructor() {
        bankNegara = msg.sender;
        accBalance = address(this).balance;
    }
    
    function withdraw(uint256 amount) public {       
        require(address(this).balance >= amount);
        msg.sender.transfer(amount);
        transactors.push(msg.sender);

        emit LogWithdrawMade(msg.sender, amount);
    }

    function deposit(uint256 amount) public payable {
        // require(msg.value == amount);
        transactors.push(msg.sender);
        
        accBalance += amount;

        if(amount > 100){
            hugeTransactors.push(msg.sender);
            amountHuge.push(amount);
        }
                    
        emit LogDepositMade(msg.sender, amount);
    }

    function getBalance() public view returns (uint256) {
        return accBalance;
    }

    function getThreshold() public onlyBankNegara view returns (uint) {
        return threshold / (1**18);
    }

    function setThreshold(uint256 newthreshold) public onlyBankNegara {
        threshold = newthreshold;
    }

    function potentialLaunderers() public onlyBankNegara returns (address[] memory) {
        if(address(this).balance > maxSave)
            potential_launderers = transactors;
        
        return potential_launderers;
    }

    function getHugeTransactors() public onlyBankNegara view returns (address[] memory, uint[] memory) {
        return (hugeTransactors, amountHuge);
    }
}