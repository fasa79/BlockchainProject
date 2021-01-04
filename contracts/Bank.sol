// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16 <0.8.0;

contract LaundererDetector {
    address[] private potential_launderers;
    address[] private transactors;
    address[] private hugeTransactors;
    uint[] private amountHuge;
    uint private threshold = 10**18;
    uint private maxSave = 50**18;
    uint8 private ownerCount;
    
    event LogDepositMade(address indexed accountAddress, uint amount);
    event LogWithdrawMade(address indexed accountAddress, uint amount);
    mapping (address => uint256) public accBalance;
    
    address bankNegara;
    
    modifier onlyBankNegara(){
        require(msg.sender == bankNegara);
        _;
        
    }
    
    constructor() payable {
        bankNegara = msg.sender;
        ownerCount = 0;
        // accBalance = address(this).balance;
        
    }
    
    function withdraw(uint256 amount) public {       
        require(accBalance[msg.sender] >= amount, "Insufficient Balance");
        msg.sender.transfer(amount);
        transactors.push(msg.sender);
        accBalance[msg.sender] -= amount;

        emit LogWithdrawMade(msg.sender, amount);
    }

    function deposit() public payable {
        // require(msg.value == amount);
        transactors.push(msg.sender);
        
        accBalance[msg.sender] += msg.value;

        if(msg.value > threshold){
            hugeTransactors.push(msg.sender);
            amountHuge.push(msg.value);
        }
                    
        emit LogDepositMade(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        // return address(this).balance;
        return accBalance[msg.sender];
    }

    function getThreshold() public onlyBankNegara view returns (uint) {
        return threshold / (1**18);
    }

    function setThreshold(uint256 newthreshold) public onlyBankNegara {
        threshold = newthreshold;
    }

    function potentialLaunderers() public  {
        if(accBalance[msg.sender] > maxSave)
            potential_launderers.push(msg.sender);
        
    }
    
    function getpotentialLaunderers() public onlyBankNegara view returns (address[] memory) {
        
        return potential_launderers;
    }

    function getHugeTransactors() public onlyBankNegara view returns (address[] memory, uint[] memory) {
        return (hugeTransactors, amountHuge);
    }
    
    function getTransactors() public view returns (address[] memory) {
        return transactors;
    }
    
}