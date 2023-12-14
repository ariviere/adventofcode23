const fs = require('fs');

// Read in the input text, then split it by return character
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const testInput = fs.readFileSync('input-min.txt', 'utf-8').trim().split('\n');



const part1 = (input) => {
    return input.reduce((points, currentCard) => {
        const lists = currentCard.split(': ')[1].split(' | ')
        const winningNumbers = lists[0].split(' ').filter(number => number !== '')
        const matchingNumbersScore = lists[1].split(' ').filter(number => number !== '').reduce((cardPoints, currentNumber) => {
            if (winningNumbers.includes(currentNumber)) {
                if (cardPoints === 0) {
                    cardPoints++
                } else {
                    cardPoints = cardPoints * 2
                }
            }

            return cardPoints
        }, 0)

        points += matchingNumbersScore
        return points
    }, 0)
}

const part2 = (input) => {
    const cardsAmountPerIndex = Array(input.length).fill(1)
    return input.reduce((cardsAmount, card, cardNumber) => {
        const lists = card.split(': ')[1].split(' | ')
        const winningNumbers = lists[0].split(' ').filter(number => number !== '')
        const matchingNumbers = lists[1].split(' ').filter(number => number !== '')
            .reduce((cardPoints, currentNumber) => {
            if (winningNumbers.includes(currentNumber))
                cardPoints++

            return cardPoints
        }, 0)

        for (let i = 1 ; i <= matchingNumbers ; i++) {
            cardsAmountPerIndex[cardNumber + i] += cardsAmountPerIndex[cardNumber]
        }

        return cardsAmount + cardsAmountPerIndex[cardNumber]
    }, 0)
}

const currentTime = new Date().getTime()
console.log(part2(input))
console.log(`Finished in ${new Date().getTime() - currentTime}ms`)

