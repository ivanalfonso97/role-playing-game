import characterData from "./data.js"
import Character from "./Character.js"

let monstersArray = ["orc", "demon", "goblin"]
let isWaiting = false

function render() {
    document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
    document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

function attack() {
    if (!isWaiting) {
        wizard.setDiceHtml()
        monster.setDiceHtml()
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()
        if (wizard.isDead) {
            isWaiting = true
            setTimeout(() => endGame(), 1000)
        } else if (monster.isDead && monstersArray.length > 0) {
            isWaiting = true
            setTimeout(() => {
                monster = getNewMonster()
                render()
                isWaiting = false
            }, 1000)      
        } else if (monster.isDead && monstersArray.length === 0) {
            setTimeout(() => endGame(), 1000)
        }
    }
}

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()]
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function endGame() {
    isWaiting = true
    const endMessage = wizard.isDead && monster.isDead ? "No victors - all creatures are dead"
        : monster.isDead ? "The Wizard wins!"
        : `The ${monster.name} is victorious!`
    const endEmoji = !wizard.isDead ? "🔮" : "☠️"
    document.body.innerHTML = 
    `<div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
    </div>` 
}


document.getElementById("attack-button").addEventListener("click", attack)

const wizard = new Character(characterData.hero)
let monster = getNewMonster()
render() 