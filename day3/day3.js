const fs = require('fs');

// Read in the input text, then split it by return character
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const testInput = fs.readFileSync('input-min.txt', 'utf-8').trim().split('\n');

const isSpecialChar = (char) => {
    const regex = /[^0-9a-zA-Z.]/
    return regex.test(char)
}

const isNumber = (char) => {
    const regex = /[0-9]/
    return regex.test(char)
}

const arrayHasSpecialChar = (array) => {
    for (let char of array) {
        if (isSpecialChar(char)) return char
    }
    return null
}

const getFullNumber = (index, line) => {
    let number = ''
    number += line[index]
    let incrementValue = 1
    for (let i = index - 1 ; i >= 0 ; i--) {
        if (isNumber(line[i])) number = line[i] + number
        else break;
    }
    for (let i = index + 1 ; i < line.length ; i++) {
        if (isNumber(line[i])) {
            number += line[i]
            incrementValue++
        }
        else break;
    }
    return {number: parseInt(number), incrementValue}
}

const getPartNumbers = (input) => {
    let sum = 0
    input.map((line, lineNumber) => {
        const lineArray = line.split('')
        let lineIndex = 0
        while (lineIndex < lineArray.length) {
            if (isNumber(lineArray[lineIndex])) {
                let charactersToTest = []
                charactersToTest.push(lineArray[lineIndex - 1])
                charactersToTest.push(lineArray[lineIndex + 1])
                charactersToTest = charactersToTest.concat(input[lineNumber - 1]?.substring(lineIndex - 1, lineIndex + 2).split(''))
                charactersToTest = charactersToTest.concat(input[lineNumber + 1]?.substring(lineIndex - 1, lineIndex + 2).split(''))
                charactersToTest = charactersToTest.filter(char => typeof char !== 'undefined')

                const specialChar = arrayHasSpecialChar(charactersToTest)
                if (specialChar) {
                    const {number, incrementValue} = getFullNumber(lineIndex, lineArray)
                    lineIndex += incrementValue
                    sum += number
                } else {
                    lineIndex++
                }
            } else {
                lineIndex++
            }
        }
    })
    return sum
}

const getFullNumberAdjacent = (index, line) => {
    let number = ''

    if (!isNumber(line[index])) {
        return null
    }

    number += line[index]

    for (let i = index - 1 ; i >= 0 ; i--) {
        if (isNumber(line[i])) number = line[i] + number
        else break;
    }
    for (let i = index + 1 ; i < line.length ; i++) {
        if (isNumber(line[i])) {
            number += line[i]
        }
        else break;
    }
    return parseInt(number)
}

const getGearsRatio = (input) => {
    let sum = 0
    input.map((line, lineNumber) => {
        const lineArray = line.split('')
        let lineIndex = 0
        while (lineIndex < lineArray.length) {
            if (lineArray[lineIndex] === '*') {
                let numbersFound = []
                numbersFound.push(getFullNumberAdjacent(lineIndex - 1, lineArray))
                numbersFound.push(getFullNumberAdjacent(lineIndex + 1, lineArray))

                if (isNumber(input[lineNumber - 1].charAt(lineIndex))) {
                    numbersFound.push(getFullNumberAdjacent(lineIndex, input[lineNumber - 1]))
                } else {
                    numbersFound.push(getFullNumberAdjacent(lineIndex - 1, input[lineNumber - 1]))
                    numbersFound.push(getFullNumberAdjacent(lineIndex + 1, input[lineNumber - 1]))
                }

                if (isNumber(input[lineNumber + 1].charAt(lineIndex))) {
                    numbersFound.push(getFullNumberAdjacent(lineIndex, input[lineNumber + 1]))
                } else {
                    numbersFound.push(getFullNumberAdjacent(lineIndex - 1, input[lineNumber + 1]))
                    numbersFound.push(getFullNumberAdjacent(lineIndex + 1, input[lineNumber + 1]))
                }

                numbersFound = numbersFound.filter(number => {
                    return isNumber(number)
                })

                if (numbersFound.length === 2) {
                    sum += (numbersFound[0] * numbersFound[1])
                }

                lineIndex++
            } else {
                lineIndex++
            }
        }
    })
    return sum
}


const currentTime = new Date().getTime()
console.log(getGearsRatio(input))
console.log(`Finished in ${new Date().getTime() - currentTime}ms`)
