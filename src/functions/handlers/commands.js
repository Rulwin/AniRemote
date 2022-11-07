const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const fs = require('fs')

module.exports = (client) => {
    client.commands = async () => {
        const commandsFolder = fs.readdirSync(`./src/commands`)

        for (const folder of commandsFolder) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'))

            const { commands, commandArray} = client

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command)
                commandArray.push(command.data.toJSON())
            }
        }

        const clientID = '1036840121573580871' 
        const guildID = 'Change this to the server you want to add the bot in'
                        
        const rest = new REST({ version: '9' }).setToken(process.env.token)

        try {
            console.log('started application with (/) commands.')

            await rest.put(
                Routes.applicationGuildCommands(clientID, guildID),
                { body: client.commandArray }
            )

            console.log('reloaded application (/) commands')

        } catch (error) {
            console.log(error)
        }

    }
}