
const { Message } = require('discord.js')
const Discord = require('discord.js')

const mongoose = require("mongoose")


const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async (client, message, args) => {

	if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
		return errors.botPerms(message, "MANAGE_CHANNELS")
	}

	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return errors.noPerms(message, "MANAGE_CHANNELS")
	}


//	let managemsguser = message.guild.roles.cache.find(rolpermiso => rolpermiso.permission === 8)

	let alluser = message.guild.roles.cache.find(aus => aus.name === '@everyone')//Creamos otro let alluser donde buscaremos el rol @everyone

	message.channel.updateOverwrite(alluser, { READ_MESSAGE_HISTORY: false, SEND_MESSAGES: false });//Re escribimos los permisos del rl @everyone para que no puedan leer ni enviar mensajes

	message.channel.updateOverwrite(aceptenmeelcodepls, { READ_MESSAGE_HISTORY: true, SEND_MESSAGES: true });//Re escribimos los permisos del rol de su servidor para que puedan leer y enviar mensajes

	const canalblock = new Discord.MessageEmbed() //Creamos un nuevo embed llamado canalblock

		.setDescription("Chat bloqueado!") //Definimos la descripción

		.setColor('#4bbf5c') //Definimos el color del embed

	message.channel.send(canalblock); //Enviamos el embed al canal

}



