
const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async(client, message, args) => {

	if (!message.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES")) {
		return errors.botPerms(message, "MANAGE_MESSAGES")
	}

	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return errors.noPerms(message, "MANAGE_MESSAGES")
	}

if(!args[0]) return message.channel.send('Porfavor especifíca un numero entre \`1 - 99\` mensajes a eliminar.')
        if(isNaN(args[0])) return message.channel.send('Solo puedes usar números.')
        if(parseInt(args[0]) > 99) return message.channel.send('La cantidad máxima de mensajes que puedo eliminar son 99.')
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))

            if(args[0] < 2) {
                message.channel.send('Se ha eliminado un solo mensaje.')
            } else {
              message.channel.send('Se han eliminado `' + args[0]  + "` mensajes.")
            }
        




    }

