const { Client, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const config = require("../../config.json");
const cooldown = new Set();

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (!interaction.guild || !interaction.channel || !interaction.isChatInputCommand) return;

        const command = client.commands.get(interaction.commandName);
        const cooldowns = await command.Cooldown;

        if (command) {
            if (command.Cooldown && cooldown.has(interaction.user.id)) return interaction.reply({ content: `Este comando tiene cooldown. Tenes que esperar ${cooldowns / 1000} segundos para vovler a usarlo`, ephemeral: true });
            cooldown.add(interaction.user.id);
            try {
                setTimeout(() => {
                    cooldown.delete(interaction.user.id)
                }, cooldowns);
                command.execute(interaction, client)
            } catch (error) {
                return interaction.reply({content: `Ocurrió un error al tratar de hacer este comando`, ephemeral: true});
            }
        }else return interaction.reply({ content: `Comando no válido`, ephemeral: true });
    }
};