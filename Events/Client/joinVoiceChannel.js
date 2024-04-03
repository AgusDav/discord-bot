const { Client } = require('discord.js');
const config = require("../../config.json");

module.exports = {
    name: 'joinVoiceChannel',
    once: false,
    /**
     * 
     * @param {Client} client
     */

    async execute(client) {
        client.on('voiceStateUpdate', (oldState, newState) => {
            if (!oldState.channel && newState.channel) {                            // Verificar si un usuario se ha unido a un canal de voz
                if (newState.channel.permissionsFor(client.user).has('CONNECT')) {  // Verificar si el bot tiene permisos para unirse al canal de voz
                    newState.channel.join()
                        .then(connection => {
                            console.log(`El bot se ha unido al canal de voz ${newState.channel.name}`);
                            // Acá va a ir para que ponga un sonido cuando se meta
                        })
                        .catch(error => {
                            console.error('Ocurrió un error al unirse al canal de voz:', error);
                        });
                } else {
                    console.log(`El bot no tiene permisos para unirse al canal de voz ${newState.channel.name}`);
                }
            }
        });
    }
}