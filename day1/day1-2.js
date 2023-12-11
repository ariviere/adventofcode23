const fs = require('fs');

// Read in the input text, then split it by return character
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

const numberRegex = /[0-9]/
const stringNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

const checkNumber = (number) =>
    (numberRegex.test(number)) ? number : null
const checkStringNumber = (input, index, reverse) => {
    for (let i = 0 ; i < stringNumbers.length ; i++) {
        if (!reverse && input.substring(index, index + stringNumbers[i].length) === stringNumbers[i]) {
            return (i + 1).toString()
        } else if (reverse && input.substring(input.length - stringNumbers[i].length - index, input.length - index) === stringNumbers[i]) {
            return (i + 1).toString()
        }
    }
    return null
}

const numbers = input.map(line => {
    let startNumber
    let endNumber
    for (let i = 0 ; i < line.length ; i++) {

        //find first number
        if (!startNumber) {
            startNumber = checkNumber(line.charAt(i))
            if (!startNumber) {
                startNumber = checkStringNumber(line, i, false)
            }
        }

        //find last number
        if (!endNumber) {
            endNumber = checkNumber(line.charAt(line.length - 1 - i))
            if (!endNumber) {
                endNumber = checkStringNumber(line, i, true)
            }
        }

        if (startNumber && endNumber) break;
    }

    return startNumber + endNumber
})

const calibration = numbers.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue)
}, 0)


console.log(numbers);
console.log(calibration);