const adjectives = require('./adjectives')
const nouns = require('./nouns')

/**
 * Creates a random kebab-case combination of adjectives and a noun.
 * @returns A randomly created string.
 */
const randomRoomGenerator = () => {
    const adjectiveLength = adjectives.length
    const nounLength = nouns.length
    const randomArray = []
    const numberOfAdjectives = Math.floor(Math.random() * 3) + 2

    for (let i = 0; i < numberOfAdjectives; i++){
        randomArray.push(adjectives[Math.floor(Math.random() * adjectiveLength)])
    }

    randomArray.push(nouns[Math.floor(Math.random() * nounLength)])
    return randomArray.join('-').toLowerCase()
 
}

module.exports = {randomRoomGenerator}