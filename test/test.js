const fs = require('fs');
const contract = JSON.parse(fs.readFileSync('./build/contracts/LaundererDetector.json', 'utf8'));
console.log(JSON.stringify(contract.abi));

var contractAddress = 0x96D6DE9D88f5747e19c9AFd91288BdA674528238;

var abi = contract.abi;
var ClientReceipt = new web3.eth.Contract(abi);
var clientReceiptContract = ClientReceipt.at(contractAddress);

var event = clientReceiptContract.Deposit(function(error, result) {
   if (!error)console.log(result);
});