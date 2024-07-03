const readline = require("readline");
const WalletService = require("./WalletService");
require("dotenv").config();

const SYMBOL = process.env.SYMBOL;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  setTimeout(() => {
    console.clear();
    console.log("1 - Create Wallet");
    console.log("2 - Recover Wallet");
    console.log("3 - Balance");
    console.log("4 - Send" + SYMBOL);
    console.log("5 - Search Tx");

    rl.question("Choose your option: ", (answer) => {
      switch (answer) {
        case "1":
          createWallet();
          menu();
          break;
        case "2":
          console.log("Recover Wallet");
          menu();
          break;
        case "3":
          console.log("Balance");
          menu();
          break;
        case "4":
          console.log("Send");
          menu();
          break;
        case "5":
          console.log("Search Tx");
          menu();
          break;
        default:
          console.log("Wrong option");
          menu();
      }
    });
  }, 1500);
}

function createWallet() {
  WalletService.createWallet();
}

menu();
