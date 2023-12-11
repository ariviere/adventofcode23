const fs = require('fs');

// Read in the input text, then split it by return character
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const numberRegex = /[0-9]/

const numbers = input.map(line => {
    let startNumber
    let endNumber
    for (let i = 0 ; i < line.length + 1 / 2 ; i++) {

        //find first number
        if (!startNumber && numberRegex.test(line.charAt(i))) {
            startNumber = line.charAt(i)
            if (endNumber) break;
        }

        //find last number
        if (!endNumber && numberRegex.test(line.charAt(line.length - 1 - i))) {
            endNumber = line.charAt(line.length - 1 - i)
            if (startNumber) break;
        }

    }

    return startNumber + endNumber
})

const calibration = numbers.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue)
}, 0)


console.log(calibration);