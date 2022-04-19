const fs = require('fs');
const readline = require('readline')

const ACCESS_LOG = "access.log";
const ip1 = "89.123.1.41";
const ip2 = "34.48.240.111";

const readStream = fs.createReadStream(ACCESS_LOG, 'utf8')
const writeStream1 = fs.createWriteStream(`${ip1}_requests.log`)
const writeStream2 = fs.createWriteStream(`${ip2}_requests.log`)

const rl = readline.createInterface({input: readStream});

rl.on('line', (input) => {
    if (input.includes(ip1)) {
        writeStream1.write(input + "\n")
    }

    if (input.includes(ip2)) {
        writeStream2.write(input + "\n")
    }
})
