const { stdin: input, stdout, exit } = require('process');
const fs = require('fs');
const path = require('path');
const readline = require('readline')



const output = fs.createWriteStream(path.join(__dirname, 'destination.txt'));
const q = readline.createInterface({ input, output })


q.write('Введите какой-нибудь текст\n')
q.on('line', (answer) => {
    if(answer == 'exit'){
        exit()
    }

    output.write(`${answer}\n`)
});


process.on('SIGINT', ()=>{
    exit()
})

process.on('exit', ()=>{
    stdout.write('Досвидания')
})