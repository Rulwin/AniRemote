const {ANIME} = require('@consumet/extensions')
const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js')
const VLC = require("vlc-client");

const vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    password: "lmao"
});

 
module.exports = {
    data: {
        name: `ep-select`
    },
    async execute(interaction, client){

        const SelectedAnime = interaction.message.content

        const gogoanime = new ANIME.Gogoanime();

        const Info = await gogoanime.fetchAnimeInfo(SelectedAnime)

        const inputNumber = interaction.fields.getTextInputValue("ep-number")


        if (Info.episodes[inputNumber].number == undefined){ //Error catching
        }else{
            const embed = new EmbedBuilder()
                .setTitle(`NOW STREAMING ${Info.title}, Episode: ${Info.episodes[inputNumber].number}`)
                .setThumbnail(Info.image)
                .addFields([
                    {name: `:D`, value: `Controller buttons are now enabled`, inline:true}
                ])

            const playButton = new ButtonBuilder()
                .setCustomId('play')
                .setEmoji(`▶️`)
                .setStyle(ButtonStyle.Primary)
            
            const pauseButton = new ButtonBuilder()
                .setCustomId('pause')
                .setEmoji(`⏸️`)
                .setStyle(ButtonStyle.Primary)

            
            await interaction.reply({
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(playButton, pauseButton)]
            })

            //make sure i clear the channel
            
        }
        const episodeInfo = await gogoanime.fetchEpisodeSources(Info.episodes[inputNumber].id)

        vlc.playFile(episodeInfo.sources[1].url, {
            noaudio: false,
            novideo:false,
            wait: true,
            timeout: 3000
        })
    }
}