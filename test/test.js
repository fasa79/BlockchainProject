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

   before(async () => {
      const bank = await LaundererDetector.deployed();
   });

   it("Proper Deposit", async () => {
      const bank = await LaundererDetector.deployed();
      bank.deposit({from: accounts[1], value: 5 * 10**18});

      const scBalance = bank.getBalance();
      console.log(scBalance);
   });
});