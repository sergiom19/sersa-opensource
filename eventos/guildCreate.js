module.exports = async (client, guildCreate) => {

const Discord = require('discord.js')

 var embed = new Discord.MessageEmbed()
  .setTitle("__**"+guildCreate.name+"**__")
  .addField("📝 Nombre: ", guildCreate.name, true)
  .addField("👑 Owner: ", guildCreate.owner, true)
  .addField("👥 Users: ", guildCreate.memberCount, true)
  
  .addField("Emojis: ", guildCreate.emojis.cache.size, true)
  .addField("Roles: ", guildCreate.roles.cache.size, true)
  .addField("Canales: ", guildCreate.channels.cache.size, true)
  
  .addField("✅ Verificacion: ", guildCreate.verified, true)
  .addField("🌎 Region: ", guildCreate.region, true)
  .addField("🆔 ", guildCreate.id, true)
  .setThumbnail(guild.iconURL({dynamic: true}))

client.channels.cache.get('853950834021629963').send(embed)

}