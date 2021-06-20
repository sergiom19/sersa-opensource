const Discord = require('discord.js')
const db = require('../../models/ModSchema')

module.exports = async(client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('No tienes permisos')
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send('Miembro no encontrado')
    const reason = args.slice(1).join(" ")
    db.findOne({ guildid: message.guild.id, user: user.user.id}, async(err, data) => {
        if(err) throw err;
        if(data) {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Advertencias de ${user.user.tag}`)
                .setDescription(
                    data.content.map(
                        (w, i) => 
                        `\`${i + 1}\` | Moderador : ${message.guild.members.cache.get(w.moderator).user.tag}\nRazón : ${w.reason}`
                    )
                )
                .setColor("BLUE")
            )
        } else {
            message.channel.send('El miembro no tiene advertencias.')
        }

    })


}