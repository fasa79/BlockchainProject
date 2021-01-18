App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;

      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('build/contracts/LaundererDetector.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var LaundererArtifact = data;
      App.contracts.LaundererDetector = TruffleContract(LaundererArtifact);
    
      // Set the provider for our contract
      App.contracts.LaundererDetector.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      // return App.markAdopted();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#btn-getBalance', App.updateBalance);
    $(document).on('click', '#btn-deposit', App.handleDeposit);
    $(document).on('click', '#btn-withdraw', App.handleWithdraw);
    $(document).on('click', '#btn-checkHigh', App.handleHighTransactors);
    $(document).on('click', '#btn-checkLaund', App.handlePotentialLaunderers);
  },

  updateBalance: function() {
    var LDInstance;

    App.contracts.LaundererDetector.deployed().then(function(instance) {
      LDInstance = instance;

      return LDInstance.getBalance.call();
    }).then(function(balance) {
      // balance = Math.round(balance * 100.0 / 10 ** 18) / 100;
      balance /= 10 ** 18;
      $('#sc-balance').text(balance);
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  

  handleDeposit: function(event) {
    event.preventDefault();
    
    var LDInstance;
    var amount = parseInt($('#amt-deposit').val());
    
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
      var account = accounts[0];

      App.contracts.LaundererDetector.deployed().then(function(instance) {
        LDInstance = instance;

        // Execute deposit as a transaction by sending account and amount
        return LDInstance.deposit({from: account, value: amount * 10**18});
      }).then(function(result) {
        return App.updateBalance();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleWithdraw: function(event) {
    
    
    var LDInstance;
    var amount = parseInt($('#amt-withdraw').val());
    
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
      var account = accounts[0];

      App.contracts.LaundererDetector.deployed().then(function(instance) {
        LDInstance = instance;

        // Execute deposit as a transaction by sending account and amount
        return LDInstance.withdraw(amount, {from: account});
      }).then(function(result) {
        return App.updateBalance();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  handleHighTransactors: function(event) {
    event.preventDefault();
    
    var LDInstance;
    var hugeTransactAdress;
    
    web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
      var account = accounts[0];

      App.contracts.LaundererDetector.deployed().then(function(instance) {
        LDInstance = instance;

        hugeTransactAdress = LDInstance.getHugeTransactors({from: account});

        return LDInstance.getHugeTransactors.call();
      }).then(function(hugeTransactAdress) {
        
        var tableHuge = document.getElementById("tableHuge");

        for (i = 0; i < hugeTransactAdress[0].length; i++) {
          var num = document.createTextNode(i+1);
          var hugeAddr = hugeTransactAdress[0][i];
          var hugeAmm = hugeTransactAdress[1][i];

          hugeAmm = parseInt(hugeAmm);
          hugeAmm /= 10 ** 18;

          var hugeTag = document.createElement('tr');
          hugeTag.innerHTML = "<td>" + (i+1) + "</td><td>" + hugeAddr + "</td><td>" + hugeAmm + "</td>"
  
          tableHuge.appendChild(hugeTag);
        }


      }).catch(function(err) {

          var errorDiv = document.getElementById("error-div");
          var errorTag = document.createElement('div');

          errorTag.setAttribute('class', 'alert alert-danger');
          errorTag.innerHTML = "Your Account is ineligible to do that!"
        
          errorDiv.appendChild(errorTag);
          // console.log(err.message);
      });
    });
  },

  handlePotentialLaunderers: function(event) {

  }

  // bindEvents: function() {
  //   $(document).on('click', '.btn-adopt', App.handleAdopt);
  // },

  // markAdopted: function() {
  //   var adoptionInstance;

  //   App.contracts.Adoption.deployed().then(function(instance) {
  //     adoptionInstance = instance;

  //     return adoptionInstance.getAdopters.call();
  //   }).then(function(adopters) {
  //     for (i = 0; i < adopters.length; i++) {
  //       if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
  //         $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
  //       }
  //     }
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  // },

  // handleAdopt: function(event) {
  //   event.preventDefault();

  //   var petId = parseInt($(event.target).data('id'));

  //   var adoptionInstance;

  //   web3.eth.getAccounts(function(error, accounts) {
  //     if (error) {
  //       console.log(error);
  //     }

  //     var account = accounts[0];

  //     App.contracts.Adoption.deployed().then(function(instance) {
  //       adoptionInstance = instance;

  //       // Execute adopt as a transaction by sending account
  //       return adoptionInstance.adopt(petId, {from: account});
  //     }).then(function(result) {
  //       return App.markAdopted();
  //     }).catch(function(err) {
  //       console.log(err.message);
  //     });
  //   });
  // }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
