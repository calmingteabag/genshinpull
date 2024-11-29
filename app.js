import express from 'express'
import {Sequelize, DataTypes, Op, Model, } from 'sequelize'
import fs from 'node:fs'

const app = express()
// const sequelize = new Sequelize('postgres://postgres:a@localhost:5432/genshinpull')

// try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }

const data = fs.readFileSync('D://Programming//Web//genshinpull//test//WishSimulator.App_Backup_26_11_2024.json')
const weapons = {}
const characters = {}
let wishData = JSON.parse(data)
let pulls = wishData.histories

console.log(Object.keys(pulls).length)
for (let i = 0 ; i < 500; i++) {
    // console.log(pulls[i].name)
    if (!Object.keys(weapons).includes(pulls[i].name) && !Object.keys(characters).includes(pulls[i].name)) {
        if (pulls[i].type === 'weapon') {
            weapons[pulls[i].name] = {
                itemId : pulls[i].itemID,
                weaponType : pulls[i].weaponType,
                rarity : pulls[i].rarity
            }
        } else if (pulls[i].type === 'character') {
            console.log(pulls[i].origin)
            characters[pulls[i].name] = {
                itemId : pulls[i].itemID,
                vision: pulls[i].vision,
                origin: pulls[i].origin,
                rarity: pulls[i].rarity

            }
        }
    }   
}

// let parsedWeapon = JSON.parse(weapons)
let stringfyWeapons = JSON.stringify(weapons)
let JSONWeapon = JSON.parse(stringfyWeapons)

let stringfyCharacters = JSON.stringify(characters)
let JSONCharacter = JSON.parse(stringfyCharacters)
console.log(stringfyCharacters)


app.get("/", (req,res) => {
    res.json(JSONCharacter)
})


app.listen(8000, () =>{
    console.log("Server Running on Port 8000")
})