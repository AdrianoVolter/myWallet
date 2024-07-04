const readline = require("readline");
const WalletService = require("./WalletService");

require("dotenv").config();

const SYMBOL = process.env.SYMBOL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let myAddress = null;

function menu() {
  setTimeout(() => {
    console.clear();
    if (myAddress) {
      console.log(`You are logged as ${myAddress}`);
    } else {
      console.log("You are not logged in");
    }
    console.log("1 - Create Wallet");
    console.log("2 - Recover Wallet");
    console.log("3 - Balance ");
    console.log(`4 - Send ${SYMBOL}`);
    console.log("5 - Search Tx");

    rl.question("Choose your option: ", (answer) => {
      switch (answer) {
        case "1":
          createWallet();
          break;
        case "2":
          recoverWallet();
          break;
        case "3":
          getBalance();
          break;
        case "4":
          sendTx();
          break;
        case "5":
          console.log("Search Tx");
          break;
        default:
          console.log("Wrong option");
          menu();
      }
    });
  }, 1000);
}

function preMenu() {
  rl.question("Press any key to continue...", () => {
    menu();
  });
}

function createWallet() {
  const myWallet = WalletService.createWallet();
  myAddress = myWallet.address;

  // console.log(`Your new wallte:`);
  // console.log(myAddress);

  console.log("Wallet created");
  console.log("Address: ", myWallet.address);
  console.log("Private Key: ", myWallet.privateKey);
  preMenu();
}

function recoverWallet() {
  console.clear();
  rl.question(`What's your private key or mnemonic? `, (pkOrMnemonic) => {
    const myWallet = WalletService.recoverWallet(pkOrMnemonic);
    myAddress = myWallet.address;

    console.log("Wallet recovered");
    console.log(myAddress);
    preMenu();
  });
}

async function getBalance() {
  console.clear();
  if (!myAddress) {
    console.log("You need to login first");
    return preMenu();
  }
  try {
    const { balanceEther } = await WalletService.getBalance(myAddress);
    console.log(`${SYMBOL} ${balanceEther}`);
  } catch (error) {
    console.log("Error getting balance");
  }
  preMenu();
}

async function sendTx() {
  console.clear();
  if (!myAddress) {
    console.log("You need to login first");
    return preMenu();
  }

  console.log(`Your wallet: ${myAddress}`);
  rl.question("To wallet: ",  (toWallet) => {
    if (!WalletService.addressIsValid(toWallet)) {
      console.log("Invalid address");
      return preMenu();
    }

    rl.question(`Amount  (in ${SYMBOL}): `, async (amountInEth) => {
      if (!amountInEth) {
        console.log("Invalid amount !");
        return preMenu();
      }
      const tx = await WalletService.buildTransaction(toWallet, amountInEth);

      if (!tx) {
        console.log("Insufficient funds (amount + fee)");
        return preMenu();
      }

      try {
        const txSent = await WalletService.sendTransaction(tx);
        console.log("Transaction sent: ");
        console.log(txSent);
      } catch (error) {
        console.error(err)

      }

      return preMenu();
    });
  });
  
}

menu();
