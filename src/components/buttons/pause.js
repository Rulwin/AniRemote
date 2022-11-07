const VLC = require("vlc-client");
const vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    password: "lmao"
});



module.exports = {
    data: {
        name: `pause`
    },

    async execute(interaction, client){
        if (vlc.isPlaying){
            vlc.pause()
        }
    }
}