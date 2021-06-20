const Discord = require('discord.js')
const mongoose = require("mongoose")

const staff = require('../../configFiles/config.json')
const errors = require('../../configFiles/errors.js');

module.exports = async(client, message, args) => {

	if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) {
		return errors.botPerms(message, "MANAGE_CHANNELS")
	}

	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return errors.noPerms(message, "MANAGE_CHANNELS")
	}

  if(!args[0]) return message.channel.send(`<@${message.author.id}>, para establecer los los canales de *registro* usa \`setlogs [registros | sanciones] #canal\`.`)

if(args[0] === 'registros') {
  
            const logsSchema = require('../../models/logs')

            let res = message.mentions.channels.first();
            if(res.type !== "text") return message.channel.send(':x: Este canal es inválido.')
        
        if(!res) return message.channel.send('Porfavor menciona un canal válido.')

        let canal_de_logs = await logsSchema.findOne({ Servidor: message.guild.id }).exec()

        if(canal_de_logs) { 
await canal_de_logs.updateOne({ Servidor: message.guild.id, Canal: res.id }) ///actualizamos
message.channel.send(`El canal de \`registros\` se ha actualizado a ${res}`) 
} else {
  let canal2 = new logsSchema({ Servidor: message.guild.id, Canal: res.id }) //si no hay uno existente
await canal2.save()
message.channel.send(`El canal de \`registros\` se ha establecido a ${res}`)
}
      };



      if(args[0] === 'sanciones') {
  
        const sancionesSchema = require('../../models/sancioneslogs')

        let res = message.mentions.channels.first();
        if(res.type !== "text") return message.channel.send(':x: Este canal es inválido.')
    
    if(!res) return message.channel.send('Porfavor menciona un canal válido.')

    let canal_de_logs = await sancionesSchema.findOne({ Servidor: message.guild.id }).exec()

    if(canal_de_logs) { 
await canal_de_logs.updateOne({ Servidor: message.guild.id, Canal: res.id }) ///actualizamos
message.channel.send(`El canal de \`sanciones\` se ha actualizado a ${res}`) 
} else {
let canal2 = new sancionesSchema({ Servidor: message.guild.id, Canal: res.id }) //si no hay uno existente
await canal2.save()
message.channel.send(`El canal de \`sanciones\` se ha establecido a ${res}`)
}
  }

    }