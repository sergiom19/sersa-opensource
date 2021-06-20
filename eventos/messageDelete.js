module.exports = async (client, message) => {

const Discord = require('discord.js')
const logsSchema = require('../models/logs')

const eliminado = new Discord.MessageEmbed()
.setDescription(`**Mensaje enviado de ${message.author} eliminado en ${message.channel}**\n${message.content}`)
.setFooter(`Autor: ${message.author.id}`)
.setTimestamp()
.setColor("#ff5719")
.setAuthor(message.author.tag, message.author.displayAvatarURL());


const canallog = await logsSchema.findOne({ Guild: message.guild.id });

if(!canallog) return;

const canal = message.guild.channels.cache.get(canallog.Canal);
canal.send(eliminado)

}