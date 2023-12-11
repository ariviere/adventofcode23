const fs = require('fs');

// Read in the input text, then split it by return character
const input = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');
const bagContent = {red: 12, green: 13, blue: 14}

const getPossibleIds = (input, bagContent) => {
    return input.reduce((sum, game) => {
        const gameSplit = game.split(': ')
        const gameId = parseInt(gameSplit[0].split(' ')[1])
        const extracts = gameSplit[1].split('; ')

        const overflow = extracts.find(extract => {
            const colors = extract.split(', ')
            return colors.find(color => {
                const colorSplit = color.split(' ')
                const colorValue = colorSplit[0]
                const colorName = colorSplit[1]
                return bagContent[colorName] < colorValue
            })
        })

        if (!overflow) {
            sum += gameId
        }

        return sum
    }, 0)
}


const getSumMinCubes = (input) => {
    return input.reduce((sum, game) => {
        const gameSplit = game.split(': ')
        const extracts = gameSplit[1].split('; ')

        const minCubes = extracts.reduce((currentMin, extract) => {
            const colors = extract.split(', ')
            colors.map(color => {
                const colorSplit = color.split(' ')
                const colorValue = colorSplit[0]
                const colorName = colorSplit[1]
                if (currentMin[colorName] < colorValue) {
                    currentMin[colorName] = parseInt(colorValue)
                }
            })

            return currentMin
        }, {blue: 0, red: 0, green: 0})

        sum += minCubes['blue'] * minCubes['red'] * minCubes['green']
        return sum
    }, 0)
}

const currentTime = new Date().getTime()
console.log(getSumMinCubes(input, bagContent))
console.log(`Finished in ${new Date().getTime() - currentTime}ms`)