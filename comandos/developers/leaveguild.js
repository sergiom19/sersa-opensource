module.exports = async (client, message, args) => { 

     const Discord = require('discord.js')
     const staff = require('../../configFiles/config.json')
      const errors = require('../../configFiles/errors.js');
    const { MessageEmbed } = require("discord.js");
    
    
   


if (!staff.staff.includes(message.author.id)) return errors.noDev(message);
    
   const guildId = args[0];
    if (!rgx.test(guildId))
      return this.sendErrorMessage(message, 0, 'Provee una ID correcta');
    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return this.sendErrorMessage(message, 0, 'Imposible encontrar la ID de ese servidor');
    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle('Saliendo del Servidor')
      .setDescription(`Me he salido de **${guild.name}**.`)
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
}