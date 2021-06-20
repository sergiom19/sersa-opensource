const Discord = require("discord.js");
const fs = require("fs");
let config = require("../configFiles/config.json");

exports.noPerms = (message, perm) => {
  var embed = new Discord.MessageEmbed()
    .setTitle('Ughh...')
    .setDescription('🟥 | No tienes el permiso `'+perm+'` para hacer esto.')
    .setColor(0xFF0000)
  message.channel.send(embed);
}

exports.noDev = (message) => {
  var embed = new Discord.MessageEmbed()
  .setTitle('Ughh...')
    .setDescription("🟥 | Lo sentimos, actualmente no estas en nuestro equipo de **desarrollo** para utilizar esto.")
    .setColor(0xFF0000)
    message.channel.send(embed);
}

exports.cError = (message) => {
  var embed = new Discord.MessageEmbed()
    .setTitle('Mmm...')
    .setDescription("🟥 | Ha ocurrido un error...")
    .setColor(0xFF0000)
    message.channel.send(embed);
}

exports.botPerms = (message, perm) => {
    var embed = new Discord.MessageEmbed()
    .setTitle('Ughh...')
   .setDescription('🟥 | No tengo el permiso `'+perm+'`para hacer esto.')
    .setColor(0xFF0000)
  
    message.channel.send(embed);
}

exports.noNsfw = (message) => {
    var embed = new Discord.MessageEmbed()
    .setTitle('Ughh...')
   .setDescription('🟥 | Para esta clase de comando necesito un canal **NSFW**')
    .setColor(0xFF0000)
  
    message.channel.send(embed);
}