const {Client} = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");
require('colors');

module.exports = {
    name:'ready',
    once:true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client){
        mongoose.set('strictQuery', true);
        await mongoose.connect(config.databaseURL, {
            keepAlive:true,
        }).then(() => {
            console.log('[MONGODB] Se conectó correctamente'.green);
        }).catch((err) => {
            console.log(`No se pudo conectar a la base de datos $(err)`.red);
        })
    }
};