const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');


module.exports = (client, message, args) => { 
 let persona = message.mentions.users.first();
 if (!persona) persona = message.author;

 let embed = new Discord.MessageEmbed()
   .setImage(`${persona.displayAvatarURL({dynamic: true})}`)
   .setColor('WHITE')
   .setFooter(`Avatar de ${persona.tag}`, persona.displayAvatarURL())

 message.channel.send(embed)

}