const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/LaundererDetector.json', 'utf8'));
console.log(JSON.stringify(contract.abi));

var abi = contract.abi;
var ClientReceipt = web3.eth.contract(abi);
var clientReceiptContract = ClientReceipt.at("0x1234...ab67" /* address */);

var event = clientReceiptContract.Deposit(function(error, result) {
   if (!error)console.log(result);
});