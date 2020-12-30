var contractABI = [];
var contractAddress ='0xAD86232f1949906dc2b8F54b22802D6A4950B26F';
var web3 = new Web3('http://localhost:9545');
var simpleSmartContract = new web3.eth.Contract(contractABI, contractAddress);
console.log(simpleSmartContract);
web3.eth.getAccounts()
.then(console.log);
