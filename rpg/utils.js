function getDiceRollArray(diceCount) {
    let diceArray = new Array(diceCount).fill(0)
    return diceArray.map(num => Math.floor(Math.random() * 6) + 1)
}

function getPlaceholderHtml(diceCount) {
    let placeholderArray = new Array(diceCount).fill(`<div class="placeholder-dice"></div>`)
    return placeholderArray
}

const getPercentage = (remainingHealth, maximumHealth) => (remainingHealth / maximumHealth) * 100

export {getDiceRollArray, getPlaceholderHtml, getPercentage}