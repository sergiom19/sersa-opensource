const Discord = require('discord.js')
const db = require('../../models/ModSchema')

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send('Miembro no encontrado')
    db.findOne({ guildid: message.guild.id, user: user.user.id }, async (err, data) => {
        if (err) throw err;
        if (data) {
            let number = parseInt(args[1]) - 1
            data.content.splice(number, 1)
            message.channel.send('Advertencia eliminada')
            data.save()
        } else {
            message.channel.send('El usuario no tiene advertencias en este servidor')
        }
    })
}