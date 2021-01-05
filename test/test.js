// const fs = require('fs');
// const contract = JSON.parse(fs.readFileSync('./build/contracts/LaundererDetector.json', 'utf8'));
// console.log(JSON.stringify(contract.abi));

// var abi = contract.abi;
// var ClientReceipt = web3.eth.contract(abi);
// var clientReceiptContract = ClientReceipt.at("0x1234...ab67" /* address */);

// var event = clientReceiptContract.Deposit(function(error, result) {
//    if (!error)console.log(result);
// });

const LaundererDetector = artifacts.require("LaundererDetector");

contract("Proper deposits", function(accounts){

   it("5 ether from account 1", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[1], value: 5 * 10**18});
   });

   it("5 ether from account 2", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[2], value: 5 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const bank = await LaundererDetector.deployed();

      let hugeTransactors, amountHuge = await bank.getHugeTransactors();
      
         console.log(hugeTransactors);
         console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const bank = await LaundererDetector.deployed();

      let potential_launderers = await bank.getPotentialLaunderer();

      console.log(potential_launderers);
   });
   
   it("Smart Contract Balance", async() =>{
      const bank = await LaundererDetector.deployed();
      
      let scBalance = await bank.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});

contract("Not proper deposits", function(accounts){

   it("15 ether from account 3", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[3], value: 15 * 10**18});
   });

   it("15 ether from account 4", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[4], value: 15 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const bank = await LaundererDetector.deployed();

      let hugeTransactors, amountHuge = await bank.getHugeTransactors();
         
      console.log(hugeTransactors);
      console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const bank = await LaundererDetector.deployed();

      let potential_launderers = await bank.getPotentialLaunderer();

      console.log(potential_launderers);
   });

   it("Smart Contract Balance", async() =>{
      const bank = await LaundererDetector.deployed();
      
      let scBalance = await bank.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});

contract("Smart Contract balance more than balance threshold", function(accounts){
   it("5 ether from account 1", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[1], value: 5 * 10**18});
   });

   it("5 ether from account 2", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[2], value: 5 * 10**18});
   });

   it("15 ether from account 3", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[3], value: 15 * 10**18});
   });

   it("15 ether from account 4", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[4], value: 15 * 10**18});
   });

   it("15 ether from account 5", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[5], value: 15 * 10**18});
   });

   it("Check for transaction more than threshold", async() =>{
      const bank = await LaundererDetector.deployed();

      let hugeTransactors, amountHuge = await bank.getHugeTransactors();
         
      console.log(hugeTransactors);
      console.log(amountHuge);
   });

   it("Check the balance if more than threshold and display potential launderers", async() =>{
      const bank = await LaundererDetector.deployed();

      let potential_launderers = await bank.getPotentialLaunderer();

      console.log(potential_launderers);
   });

   it("Smart Contract Balance", async() =>{
      const bank = await LaundererDetector.deployed();
      
      let scBalance = await bank.getBalance();
      scBalance = Number(scBalance);
      
      console.log(scBalance);
   });
});