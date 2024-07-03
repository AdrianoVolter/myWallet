const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN__NODE);

let myWallet = null;

function createWallet() {
    console.log('Creating wallet...');
}

module.exports = {
    createWallet
}