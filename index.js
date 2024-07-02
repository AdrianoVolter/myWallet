const readline = require("readline");
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
    console.log("4 - Send");
    console.log("5 - Search Tx");

    rl.question("Choose your option: ", (answer) => {
      switch (answer) {
        case "1":
          console.log("Create Wallet");
          break;
        case "2":
          console.log("Recover Wallet");
          break;
        case "3":
          console.log("Balance");
          break;
        case "4":
          console.log("Send");
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

menu();
