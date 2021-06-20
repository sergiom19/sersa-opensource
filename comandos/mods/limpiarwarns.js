const Discord = require('discord.js')
const db = require('../../models/ModSchema')

module.exports = async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos')
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!user) return message.channel.send('Miembro no encontrado')
        db.findOne({ guildid : message.guild.id, user: user.user.id}, async(err,data) => {
            if(err) throw err;
            if(data) {
                await db.findOneAndDelete({ user : user.user.id, guildid: message.guild.id})
                message.channel.send(`Se han limpiado las advertencias de ${user.user.tag}.`)
            } else {
                message.channel.send('el miembro no tiene advertencias en este servidor')
            }
        })

}