// Import libraries we need.
import Web3 from "web3";

// Import our contract artifacts and turn them into usable abstractions.
// Make sure you've ran truffle compile first

import contract_build_artifacts from "../build/contracts/FirstContract.json";

var FirstContractfetch = contract(contract_build_artifacts);

var accounts;
var account;

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
      ready();
    }
  }


//import abi so that web3 knows how to interact with the smart contract
window.App = {

  // 'Constructor'
  start: function() {
    var self = this;

    // Bootstrap the Contract abstraction for use with the current web3 instance
    FirstContract.setProvider(web3.currentProvider);

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(async function(err, accs) {

      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      web3.eth.defaultAccount = accounts[0];
      account = accounts[0];

    });
  },

};

window.App = App; //either wrap whole code inside this or create const
//front end entry point
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    ethereum.enable();
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});

function ready(){
  
  document.addEventListener('DOMContentLoaded', ()=> {
     var contract = web3.eth.contract(FirstContractfetch.abi).at(FirstContractfetch.address);
     console.log(contract);
     const setData = document.getElementsById('setData');
     const data = document.getElementsById('data');
     //2 pointers to html value

  const getData = () => {
    contract.methods
      .data() //getter function //smart contract get function
      .call() //call method execute function on blockchain and it will return promise
      .then(result => { //calling function on smart contract and assigning the result to inner html tag
            data.innerHTML =result;
      });
  };
  //defined get data function but to execute we need to call it 
  getData();
  //fire submit on this element(setdata) and this will provide us with object which is e
  setData.addEventListener('submit', e => {
    e.preventDefault();
    const data = e.target.elements[0].value;

    contract.methods
      .set(data)  //passing the data we got from the form.
      .send({from:accounts[0]}) 
      .then(getData);   //taking first address in the account array 
      //using web3 send function to send it to the blockchain
      //specify details of the transaction
      //update the UI to refresh changes

      //web3 vs truffle here we are using web3 to send transaction diff. in syntax
      //this is web3 and either one can be used for development.
      //both has its own documentation
          //define data variable and then 
    // inside event object there is a target property
    //target property has an element array (input of the form we want the first one).value
  });

  });
}
