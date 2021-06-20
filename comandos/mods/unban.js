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

let reason = args.slice(1).join(" ")
let userId = args[0]

if(!reason) reason = 'Sin razón';
if(!userId) return message.channel.send('Proporciona una ID para unbanear.')
if(isNaN(userId)) return message.channel.send("Provee una ID válida, son solo números!")

message.guild.fetchBans().then(async bans => {
    if(bans.size === 0) return message.channel.send("Nadie esta baneado en este servidor.")
    let bannedUser = bans.find(ban => ban.user.id == userId)
    if(!bannedUser) return message.channel.send('Este usuario no está baneado')
    await message.guild.members.unban(bannedUser.user, reason).catch(err => {
        return message.channel.send("Algo estuve mal")
    }).then(() => {
        message.channel.send(`Se ha unbaneado a ${userId}`)
    })
})

    }