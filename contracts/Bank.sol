// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.16 <0.8.0;

contract LaundererDetector {
    address[] private empty;
    address[] private transactors;
    address[] private hugeTransactors;
    uint[] private amountHuge;
    uint private threshold = 10 * 10**18;
    uint private maxSave = 50 * 10**18;
    uint8 private ownerCount;
    
    event LogDepositMade(address indexed accountAddress, uint amount);
    event LogWithdrawMade(address indexed accountAddress, uint amount);
    mapping (address => uint256) public accBalance;
    
    address bankNegara;
    
    modifier onlyBankNegara(){
        require(msg.sender == bankNegara);
        _;
        
    }
    
    constructor() public payable {
        bankNegara = msg.sender;
        ownerCount = 0;
        // accBalance = address(this).balance;
        
    }
    
    function withdraw(uint256 amount) public {       
        require(address(this).balance >= amount* 1 ether, "Insufficient Balance");
        msg.sender.transfer(amount * 1 ether);
        transactors.push(msg.sender);
        accBalance[msg.sender] -= amount* 1 ether;

        emit LogWithdrawMade(msg.sender, amount* 1 ether);
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
        return address(this).balance;
        // return accBalance[msg.sender];
    }
    
    function getAccountAmount() public view returns (uint256) {
        // return address(this).balance;
        return accBalance[msg.sender];
    }

    function getThreshold() public onlyBankNegara view returns (uint) {
        return threshold / (10**18);
    }

    function setThreshold(uint256 newthreshold) public onlyBankNegara {
        threshold = newthreshold * 10**18;
    }

    // function potentialLaunderers() public  {
    //     if(address(this).balance > maxSave){
    //         for (uint i=0; i < 5; i += 1) {
    //             potential_launderers[i] = transactors[i];
    //         }
    //     }
    // }
    
    function getpotentialLaunderers() public onlyBankNegara view returns (address[] memory) {
        if (address(this).balance > maxSave)
            return transactors;

        else
            return empty;
    }

    function getHugeTransactors() public onlyBankNegara view returns (address[] memory, uint[] memory) {
        return (hugeTransactors, amountHuge);
    }

    function getTransactors() public view returns (address[] memory) {
        return transactors;
    }
    
    
}