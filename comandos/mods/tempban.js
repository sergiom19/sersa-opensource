const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

const logsSchema = require('../../models/sancioneslogs')

const ms = require('ms');

module.exports = async(client, message, args) => {

	if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
		return errors.botPerms(message, "BAN_MEMBERS")
	}

	if (!message.member.hasPermission("BAN_MEMBERS")) {
		return errors.noPerms(message, "BAN_MEMBERS")
	}

    let target = message.mentions.members.first();
    let razon = args.slice(2).join(" ");
    let tiempo = args[1]
    const banEmbed= new Discord.MessageEmbed()
    .setTitle(`Has sido baneado en ${message.guild.name}`)
    .addField(`Razón; ${razon}`, `Duración: ${tiempo}`)


    if(!args[0]) return message.channel.send('Debes de mencionar un miembro para tempbanear.\`tempban @miembro tiempo\`')
    if(!target) return message.channel.send('Este miembro no está en el servidor.')
    if(!target.banneable) return message.channel.send('No puedo banear a este miembro')
    if(target.roles.highest.position >= message.member.rikes.highest.position) return message.channel.send('No puedes banear temporalmente a este miembro porque su rol es igual o mayor que el tuyo.')
    if(!razon) razon = 'Sin razón';
    if(!time) return message,channel.send('Debes de poner un tiempo para la duración del baneo a este miembro. Ejemplo: \`tempban @miembro 7d razón\`')

    await target.send(banEmbed).catch(err => console.log(err));
    await target.ban({
      days: 7,
      reason: reason
    }).catch(err => console.error(err));

    setTimeout(async function () {
await message.guild.fetchBans().then(async bans => {
  if(bans.size == 0) return message.channel.send("Este servidor no tiene ningun ban")
  let banuser = bans.find(b => b.user.id == target.id)
  if(!banuser) return console.log('Miembro unbaneado')
  await message.guild.members.unban(banuser.user, razon).catch(err => console.log(err))
})
    }, ms(tiempo));
      
    const canallog = await logsSchema.findOne({ Servidor: message.guild.id });

    if(!canallog) return;


    
    const canal = message.guild.channels.cache.get(canallog.Canal);
    canal.send(embed)

    }