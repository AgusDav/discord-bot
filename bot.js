//Requerimientos
const Discord = require('discord.js');
require('dotenv').config();
const { loadEvents } = require("./Functions/loadEvents");
const { loadCommands } = require("./Functions/loadCommands");

//Cliente
const Client = new Discord.Client({
    intents: 33155
});

Client.commands = new Discord.Collection();
Client.events = new Discord.Collection();

const token = process.env.token;

//Conexion
Client.login(token).then(async () => {
    await loadEvents(Client);                                                       //Se cargan los eventos
    await loadCommands(Client);                                                     //Se cargan los comandos
    console.log(`${Client.user.username} esta a la orden pal desorden`)   
}).catch((err) => {
    console.log(err);
});