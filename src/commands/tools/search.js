const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js')
const { ANIME } = require("@consumet/extensions");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('search-anime')
        .setDescription('Search for your anime')
        .addStringOption((option) =>
            option.setName('url')
                .setDescription('add gogoanime url here')
        ),


    async execute(interaction, client) {
        const gogoanime = new ANIME.Gogoanime();
        const getAnimeUrl= interaction.options.getString('url')
        const results = await gogoanime.fetchAnimeInfo(getAnimeUrl);

        const embed = new EmbedBuilder()
                .setTitle(`Info for ${results.title}`)
                .setThumbnail(results.image)
                .addFields([
                    {name: 'Type', value: `${results.type}`, inline:false}, //Name and type
                    {name: 'genres', value: `${results.genres}`, inline:false}, //generes
                    {name: 'releaseDate', value: `${results.releaseDate}`, inline:false}, //releaseDate
                    {name: 'total episodes', value: `${results.totalEpisodes}`, inline:false}, //total episodes
                    {name: 'subordub', value: `${results.subOrDub}`, inline:false}, //subordub
                    {name: 'status', value: `${results.status}`, inline:false}, //status
            ])


            const streamButton = new ButtonBuilder()
                .setCustomId('stream')
                .setLabel(`Stream ${results.title}`)
                .setStyle(ButtonStyle.Primary)

            await interaction.reply({
                content: `${results.id}`,
                embeds: [embed],
                components: [new ActionRowBuilder().addComponents(streamButton)]
            })

            
    }
}