const VLC = require("vlc-client");
const vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    password: "lmao"
});


module.exports = {
    data: {
        name: `play`
    },

    async execute(interaction, client){
        if (vlc.isPaused){
            vlc.play()
        }
    }
}