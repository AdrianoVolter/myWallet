const ethers = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_NODE);

let myWallet = null;

function createWallet() {
  myWallet = ethers.Wallet.createRandom(provider);
  return myWallet;
}

function recoverWallet(pkOrMnemonic) {
  myWallet =
    pkOrMnemonic.indexOf(" ") !== -1
      ? ethers.Wallet.fromPhrase(pkOrMnemonic, provider)
      : new ethers.Wallet(pkOrMnemonic, provider);

  return myWallet;
}

async function getBalance(address) {
  try {
    const balance = await provider.getBalance(address);
    return {
      balanceWei: balance,
      balanceEther: ethers.formatEther(balance),
    };
  } catch (error) {
    console.error("Error getting balance", error);
    throw error;
  }
}

function addressIsValid(address) {
  return ethers.isAddress(address);
}

async function buildTransaction(toWallet, amountInEth) { 
  const amount = ethers.parseEther(amountInEth);
  const tx = {
    to: toWallet,
    value: amount,
  };
  const feeDate = await provider.getFeeData();
  const txFee = 21000n * feeDate.gasPrice;

  const balance = await provider.getBalance(myWallet.address);
  if (balance < (amount + txFee)) {
    return false;
  }
  return tx;
}

async function sendTransaction(tx) {
  return myWallet.sendTransaction(tx);
}

module.exports = {
  createWallet,
  recoverWallet,
  getBalance,
  addressIsValid,
  buildTransaction,
  sendTransaction,
};
