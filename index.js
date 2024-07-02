const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Voce prefere A ou B? ', (answer) => {
    console.log(`Sua resposta foi: ${answer}`);
    rl.close();
});