async function loadEvents(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading('Evento', 'Estado');
    await client.events.clear();

    const eventsFolder = fs.readdirSync('./Events');
    for (const folder of eventsFolder) {
        const files = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../Events/${folder}/${file}`);
            if (event.rest) {
                if (event.once) client.rest.once(event.name, (...arg) => event.execute(...arguments, client));
                else client.rest.on(event.name, (...args) => event.execute(...args, client));
            } else {
                if(event.once) client.once(event.name, (...args) => event.execute(...args, client))
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            table.addRow(file, "Cargado");
        }
    }
    return console.log(table.toString(), "\nEventos cargados");
}
module.exports = { loadEvents };