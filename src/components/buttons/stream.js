const {ModalBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')

module.exports = {
    data: {
        name: `stream`
    },

    async execute(interaction, client){

        const modal = new ModalBuilder()
            .setCustomId('ep-select')
            .setTitle(`Select which episode to stream`)
        const textInput = new TextInputBuilder()
            .setCustomId('ep-number')
            .setLabel(`IMPORTANT!! Arrays start at 0 so Ep 1 is 0`)
            .setRequired(true)
            .setStyle(TextInputStyle.Short)

        modal.addComponents(new ActionRowBuilder().addComponents(textInput))
        
        await interaction.showModal(modal)
    }
}