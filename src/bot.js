require('dotenv').config()
const {token} = process.env
const {Client, Collection, GatewayIntentBits } = require('discord.js')
const fs = require('fs')



//Discord stuff
const client = new Client({intents: GatewayIntentBits.Guilds})

client.commands = new Collection()
client.buttons = new Collection()
client.modals = new Collection()

client.commandArray = []

const functionFolder = fs.readdirSync(`./src/functions`)

for (const folder of functionFolder){
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith("js"))
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client)
}

client.Events()
client.Commands()
client.Components()

client.login(token)

