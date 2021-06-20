module.exports = async (client, newMessage, oldMessage) => {
  
  const Discord = require('discord.js')
const logsSchema = require('../models/logs')

const eliminado = new Discord.MessageEmbed()
.setDescription(`**Mensaje editado en ${oldMessage.channel}** [Ir al mensaje](https://discordapp.com/channels/${oldMessage.guild.id}/${oldMessage.channel.id}/${oldMessage.id})`)
.setFooter(`ID del usuario: ${oldMessage.author.id}`)
.addField('Antes', `${oldMessage.content}` || "Mensaje inválido, seguramente será un embed")
.addField('Después', `${newMessage.content}` || "❓")
.setTimestamp()
.setColor("#19a7ff")
.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL());


const canallog = await logsSchema.findOne({ Guild: oldMessage.guild.id });

if(!canallog) return;

const canal = newMessage.guild.channels.cache.get(canallog.Canal);
canal.send(eliminado)


}