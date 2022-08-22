import {getDiceRollArray, getPlaceholderHtml, getPercentage} from "./utils.js"

export default class Character {
    constructor(data) {
        Object.assign(this, data)

        this.diceHtml = getPlaceholderHtml(this.diceCount)
        this.maxHealth = this.health
    }
        
    getCharacterHtml() {
        const {name, avatar, health, diceCount, diceHtml} = this
        const healthBar = this.getHealthBarHtml()
        return `
        <div class="character-card">
            <h4 class="name"> ${name} </h4>
            <img class="avatar" src="${avatar}"/>
            <p class="health">health: <b>${health}</b></p>
            ${healthBar}
            <div class="dice-container">
                ${diceHtml.join("")}
            </div>
        </div>
        `
    }

    setDiceHtml() {
        const {diceCount} = this

        this.currentDiceScore = getDiceRollArray(diceCount)
        this.diceHtml = this.currentDiceScore.map(roll => `<div class="dice">${roll}</div>`)
    }

    takeDamage(attackScoreArray) {
        const {name} = this
        let damage = attackScoreArray.reduce((total, currentAttack) => total + currentAttack)
        this.health -= damage
        if (this.health <= 0) {
            this.health = 0
            this.isDead = true
        }
    }

    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)

        return `
        <div class="health-bar-outer">
            <div class="health-bar-inner ${percent < 25 ? "danger" : ""}" 
                style="width: ${percent}%;">
            </div>
        </div>`
    }
}

// export default function Character(data) {
    
//     Object.assign(this, data)

//     this.diceHtml = getPlaceholderHtml(this.diceCount)
//     this.maxHealth = this.health
    
//     this.getCharacterHtml = function() {
//         const {name, avatar, health, diceCount, diceHtml} = this
//         const healthBar = this.getHealthBarHtml()
//         return `
//         <div class="character-card">
//             <h4 class="name"> ${name} </h4>
//             <img class="avatar" src="${avatar}"/>
//             <p class="health">health: <b>${health}</b></p>
//             ${healthBar}
//             <div class="dice-container">
//                 ${diceHtml.join("")}
//             </div>
//         </div>
//         `
//     }

//     this.setDiceHtml = function() {
//         const {diceCount} = this

//         this.currentDiceScore = getDiceRollArray(diceCount)
//         this.diceHtml = this.currentDiceScore.map(roll => `<div class="dice">${roll}</div>`)
//     }

//     this.takeDamage = function(attackScoreArray) {
//         const {name} = this
//         let damage = attackScoreArray.reduce((total, currentAttack) => total + currentAttack)
//         this.health -= damage
//         if (this.health <= 0) {
//             this.health = 0
//             this.isDead = true
//         }
//     }

//     this.getHealthBarHtml = function() {
//         const percent = getPercentage(this.health, this.maxHealth)

//         return `
//         <div class="health-bar-outer">
//             <div class="health-bar-inner ${percent < 25 ? "danger" : ""}" 
//                 style="width: ${percent}%;">
//             </div>
//         </div>`
//     }
// }