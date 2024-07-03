const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN__NODE);

let myWallet = null;

function createWallet() {
    myWallet = ethers.Wallet.createRandom(provider);
    return myWallet;
}

module.exports = {
    createWallet
}