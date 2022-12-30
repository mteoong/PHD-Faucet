// import MetaMaskOnboarding from '/node_modules/@metamask/onboarding'
//1. connect metamask to site, get user's address
/* global Web3, web3, ethereum */
const Web3 = require('web3');

var account = null;
const masterKey = "2e1e2cc4e364074a89c6c5083171ad52ae83f3fcf3ba4e7d2bc1eb62226bbca8";

var tokenContract = null;
const tokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"Blacklisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newBlacklister","type":"address"}],"name":"BlacklisterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"burner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newMasterMinter","type":"address"}],"name":"MasterMinterChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"minter","type":"address"},{"indexed":false,"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"MinterConfigured","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldMinter","type":"address"}],"name":"MinterRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newAddress","type":"address"}],"name":"PauserChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_account","type":"address"}],"name":"UnBlacklisted","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"blacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"blacklister","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"},{"internalType":"uint256","name":"minterAllowedAmount","type":"uint256"}],"name":"configureMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currency","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"},{"internalType":"string","name":"tokenCurrency","type":"string"},{"internalType":"uint8","name":"tokenDecimals","type":"uint8"},{"internalType":"address","name":"newMasterMinter","type":"address"},{"internalType":"address","name":"newPauser","type":"address"},{"internalType":"address","name":"newBlacklister","type":"address"},{"internalType":"address","name":"newOwner","type":"address"},{"internalType":"uint256","name":"tokenSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"isBlacklisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"isMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterMinter","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"minterAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauser","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"minter","type":"address"}],"name":"removeMinter","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"unBlacklist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newBlacklister","type":"address"}],"name":"updateBlacklister","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newMasterMinter","type":"address"}],"name":"updateMasterMinter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newPauser","type":"address"}],"name":"updatePauser","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const tokenAddress = "0x79753E87EF9b08092681Bad5f244329E5b6e88F5";

var minterContract = null;
const minterABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"_addr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountAllowed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"addr","type":"address"}],"name":"changeAddr","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"donateTofaucet","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lockTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_requestor","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"requestTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newAmountAllowed","type":"uint256"}],"name":"setAmountallowed","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const minterAddress = "0x8a7aD092bd3d32E15Ec875F2E27d985208AD7eb6";

var burnerContract = null;
const burnerABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"_addr","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"setOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const burnerAddress = "0x60502fAd2068EB800777404d5432A910762bfa1d";

if (window.ethereum) {
   window.web3 = new Web3(window.ethereum);
   tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
   minterContract = new web3.eth.Contract(minterABI, minterAddress);
   burnerContract = new web3.eth.Contract(burnerABI, burnerAddress);
}

const connect = async (mintButton, burnButton, connectButton, amount, wallet, balance, circulation) => {
    console.log("Ran Through Connect");
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      connectButton.style.display = "none";
   } catch (error) {
      console.error(error);
   }
   fixValues(wallet, balance, circulation);
   checkStatus(mintButton, burnButton, connectButton, amount,wallet, balance, circulation);
};

const checkStatus = async (mintButton, burnButton, connectButton, amount, wallet, balance, circulation) => {
   var accounts = await web3.eth.getAccounts();
   account = accounts[0];

   if (accounts.length == 0){
      console.log("Account Length = 0");
      connectButton.style.display = "box";
      connectButton.onclick = () => {
        connect(mintButton, burnButton, connectButton, amount, wallet, balance, circulation);
      }
   } else {
      if (connectButton) {
        connectButton.style.display = "none";  
      } 

      mintButton.onclick = () => {
        const minted = minterContract.methods.requestTokens(account, amount).send({ from: account });

        minted.on("receipt", receipt => {
            console.log(receipt);
            fixValues(wallet, balance, circulation);
        });
        minted.on("error", err => {
            console.log(err);

            var errorDiv = document.getElementById('error');
            errorDiv.style.display = "block";
            setTimeout(function() {
                errorDiv.style.display = "none";
            }, 5000); 

            fixValues(wallet, balance, circulation);
        });
        /*
        const tx = {
            from: "0xD2BD2253799A3351c65977dFEC5D08D03415a715",
            to: "0x55d794d299Ab66303e4fB2Ca95B74a971481C441",
            gas: "100000",
            data: tokenContract.methods.mint(account, amount).encodeABI() 
        }

        const signPromise = web3.eth.accounts.signTransaction(tx, masterKey);

        signPromise.then((signedTx) => {
        
            const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);

            sentTx.on("receipt", receipt => {
                console.log(receipt);
                fixValues(wallet, balance, circulation);
            });
            sentTx.on("error", err => {
                console.log(err);
            });
        
        }).catch((err) => {
           console.log(err);
        });
        */
      }
      
      burnButton.onclick = () => {
        tokenContract.methods.transfer(burnerAddress, amount).send({ from: account }).on("receipt", receipt => {
            console.log("sent");

            const tx = {
                from: "0xD2BD2253799A3351c65977dFEC5D08D03415a715",
                to: burnerAddress,
                gas: "1000000",
                data: burnerContract.methods.burn(amount).encodeABI() 
            }
    
            const signPromise = web3.eth.accounts.signTransaction(tx, masterKey);
            
            console.log("burning");

            signPromise.then((signedTx) => {
            
                const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    
                sentTx.on("receipt", receipt => {
                    console.log(receipt);
                    fixValues(wallet, balance, circulation);
                });
                sentTx.on("error", err => {
                    console.log(err);
                });
            }).catch((err) => {
               console.log(err);
            });
        })

        fixValues(wallet, balance, circulation);
      }
   }
}

const fixValues = async (wallet, balance, circulation) => {
    var accounts = await web3.eth.getAccounts();
    account = accounts[0];

    tokenContract.methods.totalSupply().call().then((result) => {
        result = result * ((10) ** -6);
        circulation.innerHTML = "Total Supply: " + result + " PHD";
    })

    if (accounts.length == 0){
        return;
     }

    wallet.innerHTML = "Wallet: " + account;

    tokenContract.methods.balanceOf(account).call().then((result) => {
        result = result * ((10) ** -6);
        balance.innerHTML = "Balance: " + result + " PHD"
     })
 }

export {checkStatus, fixValues};