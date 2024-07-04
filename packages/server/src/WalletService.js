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

module.exports = {
  createWallet,
  recoverWallet,
  getBalance,
};
