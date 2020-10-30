const express = require('express');
const router = express.Router();
const data = require('../model/data');
const fs = require('fs');
const parse = require('csv-parse');

fs.readFile('data/clients.csv', (err, data) => {
    if (err) {
        console.error(err)
    } else {
        console.log(data);
        parse('data/clients.csv', { columns: false, trim: true}, (err, rows) => {
            let dataArray = rows.split(/\r?\n/);
            console.log('this is dataarray' + dataArray);
        })
        

    
       
        console.log(`Asynchronous read , ${data.toString()}`);
    }
})


module.exports = router;
