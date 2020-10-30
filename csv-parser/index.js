#!/usr/bin/env node

/**
 * Module dependencies.
 * 
 */
const program = require('commander');
const fs = require('fs');

program
.version('1.0.0')
.option('-f, --filename [file]', 'Set the CSV filename')
.parse(process.argv);

if(fs.existsSync(program.filename)){
    save(parse(program.filename));
} else {
    console.log('File not found');
}

function parse(file) {
    const data = fs.readFileSync(file, { encoding: 'utf8' })
        .trim()
        .split('\n')
        .map(line => line.split(','))
        .sort()
        .reduce(function(transactions, line){
            transactions[line[0]] = transactions[line[0]] || [];
            
            const lender = transactions[line[0]].find(transaction => transaction.owes === line[1]);

            if(!lender) {
                transactions[line[0]].push({
                    owes: line[1],
                    amount: line[2]
                });
            } else {
                lender.amount = (parseFloat(lender.amount) + parseFloat(line[2])).toFixed(2);
            }
            return transactions;
        }, {});

    return data;
}

function save(transactions) {
    let output = [];
    Object.keys(transactions).forEach(key => {
        transactions[key].forEach(transObj => {
            let transaction = [];
            transaction.push(key);
            transaction.push(transObj.owes);
            transaction.push(transObj.amount);
            output.push(transaction);
        });
    });

    fs.writeFile('output.csv', output.join('\n'), function(err){
        if(err) {
            console.error('There was an error trying to parse the file');
        }
        console.log('Parsing file completed');
    });
}