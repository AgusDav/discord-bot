const {SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction} = require('discord.js')
const ms = require('ms')
module.exports ={
    Cooldown: ms('5s'),
    data : new SlashCommandBuilder()
    .setName('saludo')
    .setDescription('Este comando es de prueba'),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute(interaction, client){
        return interaction.reply({content:`Hola ${interaction.user}, que voce ta fazendo?`}).toString
    }
};